import { describe, it, expect } from 'vitest'

// Simple utility functions to demonstrate testing infrastructure
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

describe('Utility Functions', () => {
  describe('formatDuration', () => {
    it('formats duration correctly for hours and minutes', () => {
      expect(formatDuration(125)).toBe('2h 5m')
      expect(formatDuration(90)).toBe('1h 30m')
      expect(formatDuration(45)).toBe('0h 45m')
    })

    it('handles edge cases', () => {
      expect(formatDuration(0)).toBe('0h 0m')
      expect(formatDuration(60)).toBe('1h 0m')
    })
  })

  describe('formatPrice', () => {
    it('formats price with two decimal places', () => {
      expect(formatPrice(12.5)).toBe('$12.50')
      expect(formatPrice(0)).toBe('$0.00')
      expect(formatPrice(99.99)).toBe('$99.99')
    })
  })

  describe('validateEmail', () => {
    it('validates correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('rejects invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })
})