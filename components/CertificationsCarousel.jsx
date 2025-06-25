import LogoCarousel from "./ui/LogoCarousel";
import Image from "next/image";

const logoCarouselLogos = [
  { id: 'accenture', img: (props) => <Image src="/logos/accenture.webp" alt="Accenture" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'aws', img: (props) => <Image src="/logos/aws.webp" alt="AWS" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'gdg', img: (props) => <Image src="/logos/gdg.webp" alt="GDG" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'hp', img: (props) => <Image src="/logos/hp.webp" alt="HP" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'huggingface', img: (props) => <Image src="/logos/huggingface.webp" alt="Hugging Face" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'infosys', img: (props) => <Image src="/logos/infosys.webp" alt="Infosys" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'intel', img: (props) => <Image src="/logos/intel.webp" alt="Intel" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'nism', img: (props) => <Image src="/logos/nism.webp" alt="NISM" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'one', img: (props) => <Image src="/logos/one.webp" alt="ONE" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
  { id: 'sebi', img: (props) => <Image src="/logos/sebi.webp" alt="SEBI" fill className="object-contain filter grayscale saturate-0" style={{ filter: 'grayscale(1)' }} {...props} /> },
];

export default function CertificationsCarousel() {
  return (
    <section className="w-full py-8 overflow-hidden bg-transparent mt-24">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-black">
          Certified by Industry Leaders
        </h2>
      </div>
      <div className="relative">
        <LogoCarousel columnCount={6} logos={logoCarouselLogos} />
      </div>
    </section>
  );
}
