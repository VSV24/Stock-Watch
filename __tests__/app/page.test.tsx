import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/(root)/page'

describe('Home Page Component', () => {
  it('should render without crashing', () => {
    render(<Home />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should render Home text', () => {
    render(<Home />)
    const homeText = screen.getByText('Home')
    expect(homeText).toBeInTheDocument()
  })

  describe('Container Structure', () => {
    it('should render a div container', () => {
      const { container } = render(<Home />)
      const div = container.querySelector('div')
      expect(div).toBeInTheDocument()
    })

    it('should have flex class', () => {
      const { container } = render(<Home />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('flex')
    })

    it('should have min-h-screen class', () => {
      const { container } = render(<Home />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('min-h-screen')
    })

    it('should have home-wrapper class', () => {
      const { container } = render(<Home />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('home-wrapper')
    })

    it('should have all required classes', () => {
      const { container } = render(<Home />)
      const div = container.querySelector('div')
      expect(div?.className).toContain('flex')
      expect(div?.className).toContain('min-h-screen')
      expect(div?.className).toContain('home-wrapper')
    })
  })

  describe('Content', () => {
    it('should display only Home text', () => {
      const { container } = render(<Home />)
      const div = container.querySelector('div')
      expect(div?.textContent).toBe('Home')
    })

    it('should not render any other text', () => {
      const { container } = render(<Home />)
      expect(container.textContent).toBe('Home')
    })
  })

  describe('Component Type', () => {
    it('should be a function component', () => {
      expect(typeof Home).toBe('function')
    })

    it('should return valid JSX', () => {
      const result = Home()
      expect(result).toBeTruthy()
      expect(typeof result).toBe('object')
    })
  })

  describe('Rendering', () => {
    it('should render consistently', () => {
      const { container: container1 } = render(<Home />)
      const { container: container2 } = render(<Home />)
      
      expect(container1.innerHTML).toBe(container2.innerHTML)
    })

    it('should not throw errors during render', () => {
      expect(() => render(<Home />)).not.toThrow()
    })
  })

  describe('Export', () => {
    it('should be the default export', () => {
      expect(Home).toBeDefined()
      expect(typeof Home).toBe('function')
    })

    it('should have a name', () => {
      expect(Home.name).toBe('Home')
    })
  })

  describe('Snapshot', () => {
    it('should match snapshot', () => {
      const { container } = render(<Home />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe('Future Extensibility', () => {
    it('should be ready for additional content', () => {
      // The component structure should be ready to accept more content
      const { container } = render(<Home />)
      const wrapper = container.querySelector('.home-wrapper')
      expect(wrapper).toBeInTheDocument()
    })

    it('should maintain proper flex container', () => {
      const { container } = render(<Home />)
      const wrapper = container.querySelector('.flex')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should work within a parent component', () => {
      const Parent = () => (
        <div data-testid="parent">
          <Home />
        </div>
      )
      
      render(<Parent />)
      expect(screen.getByTestId('parent')).toBeInTheDocument()
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple renders', () => {
      const { rerender } = render(<Home />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      
      rerender(<Home />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      
      rerender(<Home />)
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('should not have any side effects', () => {
      const consoleSpy = jest.spyOn(console, 'error')
      render(<Home />)
      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })
})