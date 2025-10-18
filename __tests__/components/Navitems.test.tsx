import React from 'react'
import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Navitems from '@/components/Navitems'
import { NAV_ITEMS } from '@/lib/constanrs'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const mockUsePathname = usePathname as jest.Mock

describe('Navitems Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crashing', () => {
    render(<Navitems />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('should render all navigation items from NAV_ITEMS', () => {
    render(<Navitems />)
    
    NAV_ITEMS.forEach(item => {
      const link = screen.getByText(item.label)
      expect(link).toBeInTheDocument()
    })
  })

  it('should render correct number of navigation items', () => {
    const { container } = render(<Navitems />)
    const listItems = container.querySelectorAll('li')
    expect(listItems).toHaveLength(NAV_ITEMS.length)
  })

  it('should render links with correct href attributes', () => {
    render(<Navitems />)
    
    NAV_ITEMS.forEach(item => {
      const link = screen.getByText(item.label).closest('a')
      expect(link).toHaveAttribute('href', item.href)
    })
  })

  describe('isActive functionality', () => {
    it('should highlight Dashboard (/) when on root path', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Navitems />)
      
      const dashboardLink = screen.getByText('Dashboard')
      expect(dashboardLink).toHaveClass('text-grey-100')
    })

    it('should not highlight Dashboard when on other paths', () => {
      mockUsePathname.mockReturnValue('/search')
      render(<Navitems />)
      
      const dashboardLink = screen.getByText('Dashboard')
      expect(dashboardLink).not.toHaveClass('text-grey-100')
    })

    it('should highlight Search when on /search path', () => {
      mockUsePathname.mockReturnValue('/search')
      render(<Navitems />)
      
      const searchLink = screen.getByText('Search')
      expect(searchLink).toHaveClass('text-grey-100')
    })

    it('should highlight Search when on /search subpath', () => {
      mockUsePathname.mockReturnValue('/search/results')
      render(<Navitems />)
      
      const searchLink = screen.getByText('Search')
      expect(searchLink).toHaveClass('text-grey-100')
    })

    it('should highlight Watchlist when on /watchlist path', () => {
      mockUsePathname.mockReturnValue('/watchlist')
      render(<Navitems />)
      
      const watchlistLink = screen.getByText('Watchlist')
      expect(watchlistLink).toHaveClass('text-grey-100')
    })

    it('should highlight Watchlist when on /watchlist subpath', () => {
      mockUsePathname.mockReturnValue('/watchlist/123')
      render(<Navitems />)
      
      const watchlistLink = screen.getByText('Watchlist')
      expect(watchlistLink).toHaveClass('text-grey-100')
    })

    it('should only highlight one item at a time', () => {
      mockUsePathname.mockReturnValue('/search')
      render(<Navitems />)
      
      const links = screen.getAllByRole('link')
      const highlightedLinks = links.filter(link => 
        link.querySelector('*')?.classList.contains('text-grey-100')
      )
      expect(highlightedLinks.length).toBeLessThanOrEqual(1)
    })
  })

  describe('Styling', () => {
    it('should apply hover styling class to all links', () => {
      render(<Navitems />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveClass('hover:text-yellow-500')
      })
    })

    it('should apply transition-color class to all links', () => {
      render(<Navitems />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveClass('transition-color')
      })
    })

    it('should render list with correct flex classes', () => {
      const { container } = render(<Navitems />)
      const list = container.querySelector('ul')
      
      expect(list).toHaveClass('flex')
      expect(list).toHaveClass('flex-co')
      expect(list).toHaveClass('sm:flex-row')
    })
  })

  describe('Accessibility', () => {
    it('should have proper list structure', () => {
      render(<Navitems />)
      
      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
      expect(list.tagName).toBe('UL')
    })

    it('should have proper list items', () => {
      const { container } = render(<Navitems />)
      const listItems = container.querySelectorAll('li')
      
      expect(listItems.length).toBeGreaterThan(0)
      listItems.forEach(item => {
        expect(item.tagName).toBe('LI')
      })
    })

    it('should have accessible link elements', () => {
      render(<Navitems />)
      
      const links = screen.getAllByRole('link')
      expect(links.length).toBe(NAV_ITEMS.length)
      
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty pathname', () => {
      mockUsePathname.mockReturnValue('')
      expect(() => render(<Navitems />)).not.toThrow()
    })

    it('should handle null pathname gracefully', () => {
      mockUsePathname.mockReturnValue(null as any)
      expect(() => render(<Navitems />)).not.toThrow()
    })

    it('should handle undefined pathname gracefully', () => {
      mockUsePathname.mockReturnValue(undefined as any)
      expect(() => render(<Navitems />)).not.toThrow()
    })

    it('should handle very long pathname', () => {
      const longPath = '/search/' + 'a'.repeat(1000)
      mockUsePathname.mockReturnValue(longPath)
      expect(() => render(<Navitems />)).not.toThrow()
    })
  })
})