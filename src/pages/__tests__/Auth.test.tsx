import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../test/utils'
import { Auth } from '../Auth'

// Mock the useAuth hook
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    signIn: vi.fn(),
    signUp: vi.fn(),
    loading: false,
    user: null
  })
}))

describe('Auth Page', () => {
  it('renders sign in form by default', () => {
    render(<Auth />)
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('switches to sign up form when toggle is clicked', async () => {
    render(<Auth />)
    
    const signUpToggle = screen.getByText(/don't have an account/i)
    fireEvent.click(signUpToggle)
    
    await waitFor(() => {
      expect(screen.getByText('Create Account')).toBeInTheDocument()
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<Auth />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    })
  })

  it('validates password strength in sign up mode', async () => {
    render(<Auth />)
    
    // Switch to sign up
    const signUpToggle = screen.getByText(/don't have an account/i)
    fireEvent.click(signUpToggle)
    
    await waitFor(() => {
      const passwordInput = screen.getByLabelText(/^password/i)
      fireEvent.change(passwordInput, { target: { value: '123' } })
      
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
    })
  })

  it('shows loading state during authentication', async () => {
    // Mock loading state
    vi.doMock('../../hooks/useAuth', () => ({
      useAuth: () => ({
        signIn: vi.fn(),
        signUp: vi.fn(),
        loading: true,
        user: null
      })
    }))

    render(<Auth />)
    
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    expect(submitButton).toBeDisabled()
  })

  it('has accessible form labels and ARIA attributes', () => {
    render(<Auth />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(emailInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('required')
  })
})