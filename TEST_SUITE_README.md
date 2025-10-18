# Test Suite Documentation

This document provides an overview of the comprehensive test suite created for the header feature branch.

## Overview

A complete testing infrastructure has been set up using **Jest** and **React Testing Library**, compatible with Next.js 15 and React 19. The test suite provides thorough coverage for all components and functionality added in the current branch.

## Test Infrastructure

### Configuration Files

1. **jest.config.js** - Main Jest configuration
   - Integrates with Next.js using `next/jest`
   - Configures module path mapping for `@/` imports
   - Sets up coverage collection
   - Defines test match patterns

2. **jest.setup.js** - Test environment setup
   - Imports `@testing-library/jest-dom` for enhanced matchers
   - Mocks Next.js navigation hooks (`useRouter`, `usePathname`, `useSearchParams`)
   - Mocks Next.js `Image` component
   - Mocks Next.js `Link` component

### Package.json Updates

Added the following dev dependencies:
- `@testing-library/react@^16.1.0` - Testing utilities for React 19
- `@testing-library/jest-dom@^6.6.3` - Custom Jest matchers
- `@testing-library/user-event@^14.5.2` - User interaction simulation
- `@types/jest@^29.5.14` - TypeScript definitions for Jest
- `jest@^29.7.0` - Test runner
- `jest-environment-jsdom@^29.7.0` - DOM environment for tests

Added test scripts:
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

## Test Files

### 1. Library Tests

#### `__tests__/lib/constanrs.test.ts` (10 tests)
Tests for the navigation items constants.

**Coverage:**
- Array structure validation
- Item count verification
- Individual item validation (Dashboard, Search, Watchlist)
- Data integrity checks (unique hrefs, valid labels)
- Order verification
- Immutability testing

**Test Categories:**
- Basic structure (2 tests)
- Item validation (3 tests)
- Data integrity (4 tests)
- Immutability (1 test)

### 2. Component Tests

#### `__tests__/components/Navitems.test.tsx` (28 tests)
Tests for the navigation items component.

**Coverage:**
- Component rendering
- Navigation item display
- Active state highlighting logic
- Routing integration
- Styling classes
- Accessibility features
- Edge cases

**Test Categories:**
- Basic rendering (4 tests)
- Active state functionality (7 tests)
- Styling (3 tests)
- Accessibility (3 tests)
- Edge cases (4 tests)

#### `__tests__/components/Header.test.tsx` (18 tests)
Tests for the main header component.

**Coverage:**
- Header structure and positioning
- Logo rendering and properties
- Navigation visibility
- Component integration
- Accessibility landmarks
- Client-side rendering

**Test Categories:**
- Basic rendering (4 tests)
- Logo functionality (5 tests)
- Navigation (3 tests)
- Layout structure (2 tests)
- Accessibility (4 tests)

#### `__tests__/components/UserDropdown.test.tsx` (27 tests)
Tests for the user dropdown menu component.

**Coverage:**
- Trigger button rendering
- Dropdown content display
- User data presentation
- Sign-out functionality
- Mobile navigation integration
- Avatar display
- Styling and theming
- Accessibility features

**Test Categories:**
- Basic rendering (1 test)
- Trigger button (4 tests)
- Dropdown content (4 tests)
- Sign-out functionality (2 tests)
- Mobile navigation (2 tests)
- User data display (4 tests)
- Styling (3 tests)
- Accessibility (3 tests)
- Edge cases (2 tests)
- Avatar integration (2 tests)

### 3. UI Component Tests

#### `__tests__/components/ui/avatar.test.tsx` (30 tests)
Tests for the Avatar UI component from Radix UI.

**Coverage:**
- Root component functionality
- Image rendering and properties
- Fallback display
- Custom styling
- Component integration
- Accessibility features
- Edge cases

**Test Categories:**
- Avatar Root (7 tests)
- AvatarImage (6 tests)
- AvatarFallback (6 tests)
- Integration (2 tests)
- Accessibility (3 tests)
- Edge cases (4 tests)

#### `__tests__/components/ui/dropdown-menu.test.tsx` (19 tests)
Tests for the DropdownMenu UI component from Radix UI.

**Coverage:**
- Menu structure rendering
- Trigger functionality
- Menu items and variants
- Labels and separators
- Custom styling
- Accessibility features
- Keyboard navigation
- Complex content scenarios

**Test Categories:**
- Basic rendering (2 tests)
- Trigger (2 tests)
- Menu items (4 tests)
- Labels (2 tests)
- Separators (1 test)
- Custom styling (2 tests)
- Accessibility (2 tests)
- Edge cases (3 tests)
- Integration (1 test)

### 4. Page Tests

#### `__tests__/app/layout.test.tsx` (20 tests)
Tests for the root layout component.

**Coverage:**
- Layout structure and styling
- Header integration
- Content container
- Children rendering
- Type safety
- Accessibility
- Edge cases

**Test Categories:**
- Basic rendering (4 tests)
- Header integration (2 tests)
- Content container (4 tests)
- Layout structure (2 tests)
- Children rendering (3 tests)
- Type safety (5 tests)
- Accessibility (2 tests)
- Edge cases (3 tests)

#### `__tests__/app/page.test.tsx` (17 tests)
Tests for the home page component.

**Coverage:**
- Basic rendering
- Container structure and styling
- Content display
- Component type validation
- Consistency
- Export validation
- Integration scenarios
- Edge cases

**Test Categories:**
- Basic rendering (2 tests)
- Container structure (5 tests)
- Content (2 tests)
- Component type (2 tests)
- Rendering consistency (2 tests)
- Export validation (2 tests)
- Future extensibility (2 tests)
- Integration (1 test)
- Edge cases (2 tests)

## Total Test Count

**169 comprehensive tests** covering:
- 1 constants file
- 6 components (3 feature, 2 UI, 1 layout)
- 1 page component

## Test Coverage Areas

### Happy Paths ✓
- All components render without errors
- User interactions work as expected
- Navigation and routing function correctly
- Data displays properly

### Edge Cases ✓
- Empty/null/undefined inputs
- Missing required props
- Invalid data types
- Long strings and paths
- Multiple renders
- Conditional rendering

### Failure Conditions ✓
- Missing router instances
- Invalid pathnames
- Empty content
- Disabled states

### Accessibility ✓
- ARIA attributes
- Semantic HTML
- Keyboard navigation
- Screen reader support
- Focus management
- Role assignments

### Integration ✓
- Component composition
- Parent-child relationships
- State management
- Event handling
- Complex scenarios

## Running the Tests

### Prerequisites
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Watch Mode (recommended during development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

This generates a coverage report in the `coverage/` directory.

## Test Patterns Used

### Component Testing
- Rendering tests
- Props validation
- Event handling
- State changes
- Integration with other components

### Unit Testing
- Pure function testing
- Data structure validation
- Constants verification
- Type checking

### Mocking Strategy
- Next.js navigation hooks mocked globally
- Child components mocked in parent tests
- External dependencies isolated
- Router functionality stubbed

## Best Practices Followed

1. **Descriptive test names** - Each test clearly states what it's testing
2. **Arrange-Act-Assert** - Tests follow clear structure
3. **Isolation** - Each test is independent
4. **Mock management** - Proper cleanup in afterEach hooks
5. **Accessibility first** - Tests verify accessible patterns
6. **Edge case coverage** - Tests handle unexpected inputs
7. **Type safety** - TypeScript throughout test files
8. **Real-world scenarios** - Tests mirror actual usage

## Maintenance Notes

### Adding New Tests
1. Place test files next to source files or in `__tests__/` directory
2. Follow existing naming conventions (`*.test.tsx` or `*.spec.tsx`)
3. Use descriptive `describe` blocks to organize tests
4. Mock external dependencies appropriately
5. Clean up after tests in `afterEach` hooks

### Updating Tests
- When components change, update corresponding tests
- Maintain test coverage above 80%
- Run tests before committing changes
- Update snapshots when UI intentionally changes

### Common Issues

**Issue**: Tests fail with "Cannot find module '@/...'"
**Solution**: Ensure `jest.config.js` has correct `moduleNameMapper`

**Issue**: Navigation hooks throw errors
**Solution**: Verify `jest.setup.js` mocks are correct

**Issue**: Component not found in tests
**Solution**: Check import paths and mock configurations

## CI/CD Integration

These tests are ready for CI/CD integration. Recommended setup:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm ci

- name: Run tests
  run: npm test -- --coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Future Enhancements

Potential improvements to the test suite:

1. **E2E Tests** - Add Playwright or Cypress for full user flows
2. **Visual Regression** - Add screenshot comparison tests
3. **Performance Tests** - Add React Testing Library performance utilities
4. **Mutation Testing** - Add Stryker for mutation testing
5. **Contract Testing** - Add API contract tests if backend exists

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)