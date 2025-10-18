import React from 'react'
import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

describe('Avatar Component', () => {
  describe('Avatar Root', () => {
    it('should render without crashing', () => {
      const { container } = render(<Avatar />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should have data-slot attribute', () => {
      const { container } = render(<Avatar />)
      expect(container.firstChild).toHaveAttribute('data-slot', 'avatar')
    })

    it('should apply default size classes', () => {
      const { container } = render(<Avatar />)
      expect(container.firstChild).toHaveClass('size-8')
    })

    it('should apply base styling classes', () => {
      const { container } = render(<Avatar />)
      const avatar = container.firstChild
      expect(avatar).toHaveClass('relative')
      expect(avatar).toHaveClass('flex')
      expect(avatar).toHaveClass('shrink-0')
      expect(avatar).toHaveClass('overflow-hidden')
      expect(avatar).toHaveClass('rounded-full')
    })

    it('should accept custom className', () => {
      const { container } = render(<Avatar className="custom-class" />)
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('should merge custom className with default classes', () => {
      const { container } = render(<Avatar className="w-12 h-12" />)
      const avatar = container.firstChild
      expect(avatar).toHaveClass('w-12')
      expect(avatar).toHaveClass('h-12')
      expect(avatar).toHaveClass('relative')
      expect(avatar).toHaveClass('flex')
    })

    it('should forward additional props', () => {
      const { container } = render(<Avatar data-testid="custom-avatar" />)
      expect(container.firstChild).toHaveAttribute('data-testid', 'custom-avatar')
    })
  })

  describe('AvatarImage', () => {
    it('should render image', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" />
        </Avatar>
      )
      const img = screen.getByRole('img')
      expect(img).toBeInTheDocument()
    })

    it('should have data-slot attribute', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" data-testid="avatar-img" />
        </Avatar>
      )
      const img = screen.getByTestId('avatar-img')
      expect(img).toHaveAttribute('data-slot', 'avatar-image')
    })

    it('should apply aspect-square and size-full classes', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" data-testid="avatar-img" />
        </Avatar>
      )
      const img = screen.getByTestId('avatar-img')
      expect(img).toHaveClass('aspect-square')
      expect(img).toHaveClass('size-full')
    })

    it('should accept src attribute', () => {
      render(
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="Avatar" />
        </Avatar>
      )
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', '/avatar.jpg')
    })

    it('should accept alt attribute', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="User Avatar" />
        </Avatar>
      )
      const img = screen.getByAltText('User Avatar')
      expect(img).toBeInTheDocument()
    })

    it('should accept custom className', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" className="custom-image" data-testid="avatar-img" />
        </Avatar>
      )
      const img = screen.getByTestId('avatar-img')
      expect(img).toHaveClass('custom-image')
    })
  })

  describe('AvatarFallback', () => {
    it('should render fallback content', () => {
      render(
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      )
      expect(screen.getByText('AB')).toBeInTheDocument()
    })

    it('should have data-slot attribute', () => {
      const { container } = render(
        <Avatar>
          <AvatarFallback data-testid="fallback">AB</AvatarFallback>
        </Avatar>
      )
      const fallback = screen.getByTestId('fallback')
      expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback')
    })

    it('should apply base styling classes', () => {
      const { container } = render(
        <Avatar>
          <AvatarFallback data-testid="fallback">AB</AvatarFallback>
        </Avatar>
      )
      const fallback = screen.getByTestId('fallback')
      expect(fallback).toHaveClass('flex')
      expect(fallback).toHaveClass('size-full')
      expect(fallback).toHaveClass('items-center')
      expect(fallback).toHaveClass('justify-center')
      expect(fallback).toHaveClass('rounded-full')
    })

    it('should accept custom className', () => {
      render(
        <Avatar>
          <AvatarFallback className="bg-blue-500" data-testid="fallback">AB</AvatarFallback>
        </Avatar>
      )
      const fallback = screen.getByTestId('fallback')
      expect(fallback).toHaveClass('bg-blue-500')
    })

    it('should render text content', () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should render child elements', () => {
      render(
        <Avatar>
          <AvatarFallback>
            <span data-testid="child">Child</span>
          </AvatarFallback>
        </Avatar>
      )
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should render complete avatar with image and fallback', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test User" />
          <AvatarFallback>TU</AvatarFallback>
        </Avatar>
      )
      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByText('TU')).toBeInTheDocument()
    })

    it('should handle custom styling for all components', () => {
      const { container } = render(
        <Avatar className="w-16 h-16" data-testid="avatar-root">
          <AvatarImage 
            src="/test.jpg" 
            alt="Test" 
            className="object-cover"
            data-testid="avatar-img"
          />
          <AvatarFallback 
            className="bg-purple-500 text-white"
            data-testid="fallback"
          >
            AB
          </AvatarFallback>
        </Avatar>
      )
      
      const root = screen.getByTestId('avatar-root')
      const img = screen.getByTestId('avatar-img')
      const fallback = screen.getByTestId('fallback')
      
      expect(root).toHaveClass('w-16', 'h-16')
      expect(img).toHaveClass('object-cover')
      expect(fallback).toHaveClass('bg-purple-500', 'text-white')
    })
  })

  describe('Accessibility', () => {
    it('should have proper img role', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="User" />
        </Avatar>
      )
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('should have alt text for images', () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="John Doe" />
        </Avatar>
      )
      expect(screen.getByAltText('John Doe')).toBeInTheDocument()
    })

    it('should render fallback text for screen readers', () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )
      expect(screen.getByText('JD')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      expect(() => render(<Avatar />)).not.toThrow()
    })

    it('should handle missing src for image', () => {
      expect(() => render(
        <Avatar>
          <AvatarImage alt="Test" />
        </Avatar>
      )).not.toThrow()
    })

    it('should handle empty fallback', () => {
      expect(() => render(
        <Avatar>
          <AvatarFallback />
        </Avatar>
      )).not.toThrow()
    })

    it('should handle multiple children', () => {
      expect(() => render(
        <Avatar>
          <AvatarImage src="/test1.jpg" alt="Test 1" />
          <AvatarImage src="/test2.jpg" alt="Test 2" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      )).not.toThrow()
    })
  })
})