import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import { NowShowingCard } from '../movies/NowShowingCard'

const mockMovie = {
  id: '1',
  title: 'Test Movie',
  poster_url: 'https://example.com/poster.jpg',
  rating: 'PG-13',
  duration: 120,
  genres: ['Action', 'Adventure'],
  release_date: '2024-01-01'
}

describe('NowShowingCard', () => {
  it('renders movie information correctly', () => {
    render(<NowShowingCard movie={mockMovie} />)
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('PG-13')).toBeInTheDocument()
    expect(screen.getByText('2h 0m')).toBeInTheDocument()
  })

  it('displays movie poster with correct alt text', () => {
    render(<NowShowingCard movie={mockMovie} />)
    
    const poster = screen.getByRole('img', { name: /test movie poster/i })
    expect(poster).toHaveAttribute('src', mockMovie.poster_url)
  })

  it('shows genres as comma-separated list', () => {
    render(<NowShowingCard movie={mockMovie} />)
    
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument()
  })

  it('has accessible button for booking', () => {
    render(<NowShowingCard movie={mockMovie} />)
    
    const bookButton = screen.getByRole('button', { name: /book now/i })
    expect(bookButton).toBeInTheDocument()
    expect(bookButton).not.toBeDisabled()
  })
})