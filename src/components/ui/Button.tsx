'use client';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    leftIcon,
    rightIcon,
    isLoading = false,
    className = '',
    disabled = false,
    as: Component = 'button',
    ...props
  },
  ref
) => {
  const buttonClasses = classNames(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    {
      [styles.fullWidth]: fullWidth,
      [styles.loading]: isLoading,
      [styles.disabled]: disabled,
    },
    className
  );

  const content = (
    <>
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <span className={styles.content}>{children}</span>
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      {isLoading && (
        <span className={styles.loader}>
          <span />
          <span />
          <span />
        </span>
      )}
    </>
  );

  // If it's a link, we need to render an anchor tag
  if (Component === 'a') {
    const { href, target, rel, ...rest } = props as { href?: string; target?: string; rel?: string } & Record<string, unknown>;
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={buttonClasses}
        whileHover={!disabled ? { scale: 1.03 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  // Otherwise, render a button
  return (
    <motion.button
      type={props.type || 'button'}
      className={buttonClasses}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      ref={ref}
      {...(props as Record<string, unknown>)}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
