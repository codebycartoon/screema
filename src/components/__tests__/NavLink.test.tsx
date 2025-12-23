import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { NavLink } from '../NavLink'

describe('NavLink', () => {
  it('renders with correct text', () => {
    render(
      <NavLink to="/test" className="test-class">
        Test Link
      </NavLink>
    )
    
    expect(screen.getByText('Test Link')).toBeInTheDocument()
  })

  it('applies active class when current path matches', () => {
    render(
      <NavLink to="/" className="test-class">
        Home
      </NavLink>
    )
    
    const link = screen.getByText('Home')
    expect(link).toHaveClass('test-class')
  })

  it('renders as a link element', () => {
    render(
      <NavLink to="/about" className="test-class">
        About
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toHaveAttribute('href', '/about')
  })
})