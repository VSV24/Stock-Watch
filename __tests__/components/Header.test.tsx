import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

// Mock child components
jest.mock('@/components/Navitems', () => {
  return function MockNavitems() {
    return <div data-testid="mock-navitems">Navitems</div>
  }
})

jest.mock('@/components/UserDropdown', () => {
  return function MockUserDropdown() {
    return <div data-testid="mock-userdropdown">UserDropdown</div>
  }
})

describe('Header Component', () => {
  it('should render without crashing', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should render as a header element', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
  })

  it('should have sticky positioning', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('sticky')
    expect(header).toHaveClass('top-0')
  })

  it('should have header class', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('header')
  })

  describe('Logo', () => {
    it('should render logo image', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist')
      expect(logo).toBeInTheDocument()
    })

    it('should have correct logo dimensions', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist')
      expect(logo).toHaveAttribute('width', '140')
      expect(logo).toHaveAttribute('height', '32')
    })

    it('should have correct logo source', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist')
      expect(logo).toHaveAttribute('src', '/assets/icons/logo.svg')
    })

    it('should have logo styling classes', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist')
      expect(logo).toHaveClass('h-8')
      expect(logo).toHaveClass('w-auto')
      expect(logo).toHaveClass('cursor-pointer')
    })

    it('should wrap logo in link to home', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist')
      const link = logo.closest('a')
      expect(link).toHaveAttribute('href', '/')
    })
  })

  describe('Navigation', () => {
    it('should render Navitems component', () => {
      render(<Header />)
      expect(screen.getByTestId('mock-navitems')).toBeInTheDocument()
    })

    it('should wrap Navitems in nav element', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('should hide navigation on small screens', () => {
      const { container } = render(<Header />)
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('hidden')
      expect(nav).toHaveClass('sm:block')
    })
  })

  describe('UserDropdown', () => {
    it('should render UserDropdown component', () => {
      render(<Header />)
      expect(screen.getByTestId('mock-userdropdown')).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('should have container div', () => {
      const { container } = render(<Header />)
      const containerDiv = container.querySelector('.container')
      expect(containerDiv).toBeInTheDocument()
    })

    it('should have header-wrapper class', () => {
      const { container } = render(<Header />)
      const wrapper = container.querySelector('.header-wrapper')
      expect(wrapper).toBeInTheDocument()
    })

    it('should render all main sections', () => {
      render(<Header />)
      // Logo link
      expect(screen.getByRole('link', { name: /signalist/i })).toBeInTheDocument()
      // Navitems
      expect(screen.getByTestId('mock-navitems')).toBeInTheDocument()
      // UserDropdown
      expect(screen.getByTestId('mock-userdropdown')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have header landmark', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('should have navigation landmark', () => {
      render(<Header />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('should have alt text for logo', () => {
      render(<Header />)
      const logo = screen.getByAltText('Signalist')
      expect(logo).toBeInTheDocument()
    })

    it('should have accessible home link', () => {
      render(<Header />)
      const homeLink = screen.getByRole('link', { name: /signalist/i })
      expect(homeLink).toHaveAttribute('href', '/')
    })
  })

  describe('Client-side rendering', () => {
    it('should render with use client directive', () => {
      // Component should render without errors in test environment
      expect(() => render(<Header />)).not.toThrow()
    })
  })
})