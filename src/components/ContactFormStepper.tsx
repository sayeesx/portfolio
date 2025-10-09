import { useState } from 'react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import Stepper, { Step } from './Stepper';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

type ValidationErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactFormStepper() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormLocked, setIsFormLocked] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (currentStep === 1) {
      if (!validateName(formData.name)) {
        newErrors.name = 'Name must be at least 2 characters long';
      }
    } else if (currentStep === 2) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else if (currentStep === 4) {
      if (!validateMessage(formData.message)) {
        newErrors.message = 'Message must be at least 10 characters long';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateMessage(formData.message)) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalStepCompleted = async () => {
    // Before sending, ensure all required fields are valid
    const ok = validateAllFields();
    if (!ok) {
      toast.warning('Please fill all required fields correctly before sending');
      // Jump to the first invalid step
      if (errors.name) setCurrentStep(1);
      else if (errors.email) setCurrentStep(2);
      else if (errors.message) setCurrentStep(4);
      return;
    }

    // proceed with sending
    setIsFormLocked(true);
    setSubmissionState('sending');
    
    try {
      // EmailJS credentials
      const serviceId = 'service_33hggme';
      const templateIdOwner = 'template_tr5sgir'; // Template for you
      const templateIdUser = 'template_hf8ujcu'; // Template for user auto-reply
      const publicKey = 'IQdWh9pIj4-OkLp7m';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'No subject',
        message: formData.message
      };

      console.log('Sending email with params:', templateParams);
      console.log('Service ID:', serviceId);
      console.log('Template ID Owner:', templateIdOwner);
      console.log('Template ID User:', templateIdUser);
      console.log('Public Key:', publicKey);

      // 1️⃣ Send message to yourself (owner)
      try {
        const ownerResponse = await emailjs.send(
          serviceId,
          templateIdOwner,
          templateParams,
          publicKey
        );
        console.log('✅ Owner email sent successfully:', ownerResponse);
      } catch (ownerError) {
        console.error('❌ FAILED to send owner email:', ownerError);
        console.error('Owner error details:', JSON.stringify(ownerError, null, 2));
        throw new Error(`Owner email failed: ${ownerError instanceof Error ? ownerError.message : 'Unknown error'}`);
      }

      // 2️⃣ Send auto-reply acknowledgment to the user
      try {
        const userResponse = await emailjs.send(
          serviceId,
          templateIdUser,
          templateParams,
          publicKey
        );
        console.log('✅ User auto-reply sent successfully:', userResponse);
      } catch (userError) {
        console.error('❌ FAILED to send user auto-reply:', userError);
        console.error('User error details:', JSON.stringify(userError, null, 2));
        // Don't throw here - owner email already sent
        console.warn('Owner email was sent, but user auto-reply failed');
      }

      setSubmissionState('success');
      toast.success('Message sent successfully!', {
        description: "I'll get back to you as soon as possible."
      });

      // Wait for success animation to show, then reset
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setCurrentStep(1);
        setSubmissionState('idle');
        setIsFormLocked(false);
      }, 2000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      setSubmissionState('error');
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error message:', errorMessage);
      
      toast.error('Failed to send message', {
        description: errorMessage
      });

      // Wait for error animation to show, then reset
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setCurrentStep(1);
        setSubmissionState('idle');
        setIsFormLocked(false);
      }, 2000);
    }
  };

  const renderSendButton = () => {
    if (submissionState === 'sending') {
      return (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending...
        </motion.div>
      );
    }

    if (submissionState === 'success') {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <Check className="h-5 w-5" />
          Sent!
        </div>
      );
    }

    if (submissionState === 'error') {
      return (
        <div className="flex items-center gap-2 text-red-600">
          <X className="h-5 w-5" />
          Failed
        </div>
      );
    }

    return 'Send';
  };

  return (
    <Stepper
      key={`${currentStep}-${isFormLocked}`}
      initialStep={currentStep}
      onStepChange={setCurrentStep}
      disableStepIndicators
      onFinalStepCompleted={handleFinalStepCompleted}
      onValidateStep={validateCurrentStep}
      stepCircleContainerClassName="backdrop-blur-md bg-black/30"
      nextButtonText="Next"
      backButtonText="Back"
      nextButtonProps={{
        disabled: submissionState === 'sending',
        children: currentStep === 4 ? renderSendButton() : undefined
      }}
      backButtonProps={{
        disabled: submissionState === 'sending'
      }}
    >
      <Step>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">What's your name?</h3>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`bg-black border-gray-700 text-white placeholder:text-gray-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                {errors.name}
              </motion.p>
            )}
          </div>
        </div>
      </Step>

      <Step>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">What's your email?</h3>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`bg-black border-gray-700 text-white placeholder:text-gray-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
        </div>
      </Step>

      <Step>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Subject (Optional)</h3>
          <Input
            type="text"
            placeholder="What's this about?"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="bg-black border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>
      </Step>

      <Step>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Your message</h3>
          <div className="space-y-2">
            <Textarea
              placeholder="Tell me about your project..."
              rows={6}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`bg-black border-gray-700 text-white placeholder:text-gray-500 ${
                errors.message ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                {errors.message}
              </motion.p>
            )}
          </div>
        </div>
      </Step>
    </Stepper>
  );
}