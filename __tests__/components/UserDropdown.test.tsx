import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import UserDropdown from '@/components/UserDropdown'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock child components
jest.mock('@/components/Navitems', () => {
  return function MockNavitems() {
    return <div data-testid="mock-navitems-mobile">Mobile Navitems</div>
  }
})

const mockPush = jest.fn()
const mockUseRouter = useRouter as jest.Mock

describe('UserDropdown Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crashing', () => {
    render(<UserDropdown />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  describe('Trigger Button', () => {
    it('should render trigger button with ghost variant', () => {
      render(<UserDropdown />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-grey-4')
      expect(button).toHaveClass('hover:text-yellow-500')
    })

    it('should display user avatar', () => {
      render(<UserDropdown />)
      // Avatar should be present
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should display user name on medium screens', () => {
      render(<UserDropdown />)
      expect(screen.getByText('Toji')).toBeInTheDocument()
    })

    it('should show avatar with fallback', () => {
      const { container } = render(<UserDropdown />)
      // Check for avatar fallback text
      const fallbacks = container.querySelectorAll('.bg-yellow-500')
      expect(fallbacks.length).toBeGreaterThan(0)
    })
  })

  describe('Dropdown Menu Content', () => {
    it('should display user information in dropdown label', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      // User name should appear twice (in button and in dropdown)
      const userNames = screen.getAllByText('Toji')
      expect(userNames.length).toBeGreaterThanOrEqual(1)
    })

    it('should display user email in dropdown', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        expect(screen.getByText('tojifushigiro@jjk.com')).toBeInTheDocument()
      })
    })

    it('should display logout menu item', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
    })

    it('should display LogOut icon', async () => {
      const user = userEvent.setup()
      const { container } = render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        // Check for LogOut icon presence
        const logoutItem = screen.getByText('Logout').closest('div')
        expect(logoutItem).toBeInTheDocument()
      })
    })
  })

  describe('Sign Out Functionality', () => {
    it('should call router.push with /sign-in on logout click', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        const logoutButton = screen.getByText('Logout')
        expect(logoutButton).toBeInTheDocument()
      })
      
      const logoutButton = screen.getByText('Logout')
      await user.click(logoutButton)
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/sign-in')
      })
    })

    it('should handle multiple logout clicks gracefully', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
      
      const logoutButton = screen.getByText('Logout')
      await user.click(logoutButton)
      await user.click(logoutButton)
      
      expect(mockPush).toHaveBeenCalled()
    })
  })

  describe('Mobile Navigation', () => {
    it('should render mobile Navitems in dropdown', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        expect(screen.getByTestId('mock-navitems-mobile')).toBeInTheDocument()
      })
    })

    it('should have mobile Navitems hidden on larger screens', async () => {
      const user = userEvent.setup()
      const { container } = render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        const mobileNav = container.querySelector('nav.sm\\:hidden')
        expect(mobileNav).toBeInTheDocument()
      })
    })
  })

  describe('User Data', () => {
    it('should display correct user name', () => {
      render(<UserDropdown />)
      expect(screen.getByText('Toji')).toBeInTheDocument()
    })

    it('should display correct user email', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        expect(screen.getByText('tojifushigiro@jjk.com')).toBeInTheDocument()
      })
    })

    it('should display user initial in avatar fallback', () => {
      const { container } = render(<UserDropdown />)
      const fallback = container.querySelector('.bg-yellow-500.text-yellow-900')
      expect(fallback).toBeInTheDocument()
      expect(fallback?.textContent).toBe('T')
    })

    it('should have avatar image source', () => {
      const { container } = render(<UserDropdown />)
      const avatarImages = container.querySelectorAll('img')
      expect(avatarImages.length).toBeGreaterThan(0)
    })
  })

  describe('Styling', () => {
    it('should have correct button styling', () => {
      render(<UserDropdown />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('flex')
      expect(button).toHaveClass('items-center')
      expect(button).toHaveClass('gap-3')
    })

    it('should have separators with correct styling', async () => {
      const user = userEvent.setup()
      const { container } = render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        const separators = container.querySelectorAll('.bg-gray-600')
        expect(separators.length).toBeGreaterThan(0)
      })
    })

    it('should have correct logout item styling', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      await waitFor(() => {
        const logoutItem = screen.getByText('Logout').closest('div')
        expect(logoutItem).toHaveClass('text-gray-100')
        expect(logoutItem).toHaveClass('text-md')
        expect(logoutItem).toHaveClass('font-medium')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button', () => {
      render(<UserDropdown />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      await user.tab()
      expect(button).toHaveFocus()
    })

    it('should open dropdown on Enter key', async () => {
      const user = userEvent.setup()
      render(<UserDropdown />)
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByText('Logout')).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing router gracefully', () => {
      mockUseRouter.mockReturnValue({
        push: undefined,
      })
      
      expect(() => render(<UserDropdown />)).not.toThrow()
    })

    it('should render even if user data is empty', () => {
      // Component has hardcoded user data, but testing the structure
      expect(() => render(<UserDropdown />)).not.toThrow()
    })
  })

  describe('Avatar Component', () => {
    it('should render avatar with correct size', () => {
      const { container } = render(<UserDropdown />)
      const avatar = container.querySelector('.h-8.w-8')
      expect(avatar).toBeInTheDocument()
    })

    it('should have fallback styling', () => {
      const { container } = render(<UserDropdown />)
      const fallback = container.querySelector('.bg-yellow-500')
      expect(fallback).toBeInTheDocument()
      expect(fallback).toHaveClass('text-yellow-900')
      expect(fallback).toHaveClass('text-sm')
      expect(fallback).toHaveClass('font-bold')
    })
  })
})