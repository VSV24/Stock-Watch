import React from 'react'
import { render, screen } from '@testing-library/react'
import Layout from '@/app/(root)/layout'

// Mock Header component
jest.mock('@/components/Header', () => {
  return function MockHeader() {
    return <header data-testid="mock-header">Header</header>
  }
})

describe('Root Layout Component', () => {
  const mockChildren = <div data-testid="test-children">Test Children</div>

  it('should render without crashing', () => {
    render(<Layout>{mockChildren}</Layout>)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('should render as main element', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('should have min-h-screen class', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const main = container.querySelector('main')
    expect(main).toHaveClass('min-h-screen')
  })

  it('should have text-grey-400 class', () => {
    const { container } = render(<Layout>{mockChildren}</Layout>)
    const main = container.querySelector('main')
    expect(main).toHaveClass('text-grey-400')
  })

  describe('Header', () => {
    it('should render Header component', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    })

    it('should render Header before children', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const main = container.querySelector('main')
      const firstChild = main?.firstChild
      expect(firstChild).toHaveAttribute('data-testid', 'mock-header')
    })
  })

  describe('Content Container', () => {
    it('should render children inside container', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByTestId('test-children')).toBeInTheDocument()
    })

    it('should wrap children in container div', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const contentContainer = container.querySelector('.container')
      expect(contentContainer).toBeInTheDocument()
    })

    it('should have py-10 padding class', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const contentContainer = container.querySelector('.container.py-10')
      expect(contentContainer).toBeInTheDocument()
    })

    it('should render children content correctly', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByText('Test Children')).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('should have correct DOM hierarchy', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const main = container.querySelector('main')
      const header = screen.getByTestId('mock-header')
      const contentContainer = container.querySelector('.container')
      
      expect(main?.contains(header)).toBe(true)
      expect(main?.contains(contentContainer as Node)).toBe(true)
    })

    it('should render Header and content container as siblings', () => {
      const { container } = render(<Layout>{mockChildren}</Layout>)
      const main = container.querySelector('main')
      expect(main?.children.length).toBe(2)
    })
  })

  describe('Children Rendering', () => {
    it('should render multiple children', () => {
      render(
        <Layout>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </Layout>
      )
      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(screen.getByTestId('child-2')).toBeInTheDocument()
    })

    it('should render complex children structures', () => {
      render(
        <Layout>
          <div>
            <h1>Title</h1>
            <p>Paragraph</p>
          </div>
        </Layout>
      )
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Paragraph')).toBeInTheDocument()
    })

    it('should render React components as children', () => {
      const ChildComponent = () => <div data-testid="child-component">Component</div>
      render(
        <Layout>
          <ChildComponent />
        </Layout>
      )
      expect(screen.getByTestId('child-component')).toBeInTheDocument()
    })
  })

  describe('Type Safety', () => {
    it('should accept ReactNode as children prop', () => {
      expect(() => render(<Layout>{mockChildren}</Layout>)).not.toThrow()
    })

    it('should handle null children', () => {
      expect(() => render(<Layout>{null}</Layout>)).not.toThrow()
    })

    it('should handle undefined children', () => {
      expect(() => render(<Layout>{undefined}</Layout>)).not.toThrow()
    })

    it('should handle string children', () => {
      render(<Layout>Plain text</Layout>)
      expect(screen.getByText('Plain text')).toBeInTheDocument()
    })

    it('should handle number children', () => {
      render(<Layout>{42}</Layout>)
      expect(screen.getByText('42')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have main landmark', () => {
      render(<Layout>{mockChildren}</Layout>)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should have proper semantic structure', () => {
      render(<Layout>{mockChildren}</Layout>)
      const main = screen.getByRole('main')
      expect(main.tagName).toBe('MAIN')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children gracefully', () => {
      const { container } = render(<Layout>{''}</Layout>)
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
    })

    it('should handle fragment children', () => {
      render(
        <Layout>
          <>
            <div data-testid="fragment-child-1">Fragment 1</div>
            <div data-testid="fragment-child-2">Fragment 2</div>
          </>
        </Layout>
      )
      expect(screen.getByTestId('fragment-child-1')).toBeInTheDocument()
      expect(screen.getByTestId('fragment-child-2')).toBeInTheDocument()
    })

    it('should handle conditional rendering', () => {
      const condition = true
      render(
        <Layout>
          {condition && <div data-testid="conditional">Conditional Content</div>}
        </Layout>
      )
      expect(screen.getByTestId('conditional')).toBeInTheDocument()
    })
  })

  describe('Export', () => {
    it('should be the default export', () => {
      expect(Layout).toBeDefined()
      expect(typeof Layout).toBe('function')
    })
  })
})