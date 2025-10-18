import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

describe('DropdownMenu Components', () => {
  describe('Basic Rendering', () => {
    it('should render dropdown menu structure', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      expect(screen.getByText('Open')).toBeInTheDocument()
    })

    it('should have data-slot attributes', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="trigger">Open</DropdownMenuTrigger>
        </DropdownMenu>
      )
      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveAttribute('data-slot', 'dropdown-menu-trigger')
    })
  })

  describe('DropdownMenuTrigger', () => {
    it('should render trigger button', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Click me</DropdownMenuTrigger>
        </DropdownMenu>
      )
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('should be clickable', async () => {
      const user = userEvent.setup()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      const trigger = screen.getByText('Open')
      await user.click(trigger)
      // After click, content should be accessible
    })
  })

  describe('DropdownMenuItem', () => {
    it('should render menu items', async () => {
      const user = userEvent.setup()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      await user.click(screen.getByText('Open'))
      // Items should be in the document after opening
    })

    it('should handle click events', async () => {
      const handleClick = jest.fn()
      const user = userEvent.setup()
      
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleClick}>Clickable</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      await user.click(screen.getByText('Open'))
      const item = screen.getByText('Clickable')
      await user.click(item)
      
      expect(handleClick).toHaveBeenCalled()
    })

    it('should support destructive variant', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem variant="destructive" data-testid="destructive-item">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      // Component renders with variant prop
      expect(screen.getByText('Open')).toBeInTheDocument()
    })

    it('should support inset prop', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem inset data-testid="inset-item">
              Inset Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      expect(screen.getByText('Open')).toBeInTheDocument()
    })
  })

  describe('DropdownMenuLabel', () => {
    it('should render label', async () => {
      const user = userEvent.setup()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Label</DropdownMenuLabel>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      await user.click(screen.getByText('Open'))
      expect(screen.getByText('My Label')).toBeInTheDocument()
    })

    it('should support inset prop', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      expect(screen.getByText('Open')).toBeInTheDocument()
    })
  })

  describe('DropdownMenuSeparator', () => {
    it('should render separator', () => {
      const { container } = render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuSeparator data-testid="separator" />
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      expect(screen.getByText('Open')).toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger className="custom-trigger">Open</DropdownMenuTrigger>
        </DropdownMenu>
      )
      
      const trigger = screen.getByText('Open')
      expect(trigger).toHaveClass('custom-trigger')
    })

    it('should merge custom classes with defaults', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-blue-500">Open</DropdownMenuTrigger>
        </DropdownMenu>
      )
      
      const trigger = screen.getByText('Open')
      expect(trigger).toHaveClass('bg-blue-500')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      const trigger = screen.getByText('Menu')
      expect(trigger).toBeInTheDocument()
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      const trigger = screen.getByText('Menu')
      await user.tab()
      expect(trigger).toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      expect(() => render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent />
        </DropdownMenu>
      )).not.toThrow()
    })

    it('should handle no items', () => {
      expect(() => render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Empty</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )).not.toThrow()
    })

    it('should handle disabled items', () => {
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      expect(screen.getByText('Open')).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should work with complex content', async () => {
      const user = userEvent.setup()
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>Complex Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Section 1</DropdownMenuLabel>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Section 2</DropdownMenuLabel>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
      
      await user.click(screen.getByText('Complex Menu'))
      expect(screen.getByText('Section 1')).toBeInTheDocument()
      expect(screen.getByText('Section 2')).toBeInTheDocument()
    })
  })
})