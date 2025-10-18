import { NAV_ITEMS } from '@/lib/constanrs'

describe('NAV_ITEMS Constants', () => {
  it('should export NAV_ITEMS array', () => {
    expect(NAV_ITEMS).toBeDefined()
    expect(Array.isArray(NAV_ITEMS)).toBe(true)
  })

  it('should have exactly 3 navigation items', () => {
    expect(NAV_ITEMS).toHaveLength(3)
  })

  it('should contain Dashboard navigation item', () => {
    const dashboard = NAV_ITEMS.find(item => item.label === 'Dashboard')
    expect(dashboard).toBeDefined()
    expect(dashboard?.href).toBe('/')
  })

  it('should contain Search navigation item', () => {
    const search = NAV_ITEMS.find(item => item.label === 'Search')
    expect(search).toBeDefined()
    expect(search?.href).toBe('/search')
  })

  it('should contain Watchlist navigation item', () => {
    const watchlist = NAV_ITEMS.find(item => item.label === 'Watchlist')
    expect(watchlist).toBeDefined()
    expect(watchlist?.href).toBe('/watchlist')
  })

  it('should have valid href for all items', () => {
    NAV_ITEMS.forEach(item => {
      expect(item.href).toBeDefined()
      expect(typeof item.href).toBe('string')
      expect(item.href.startsWith('/')).toBe(true)
    })
  })

  it('should have valid label for all items', () => {
    NAV_ITEMS.forEach(item => {
      expect(item.label).toBeDefined()
      expect(typeof item.label).toBe('string')
      expect(item.label.length).toBeGreaterThan(0)
    })
  })

  it('should have unique hrefs', () => {
    const hrefs = NAV_ITEMS.map(item => item.href)
    const uniqueHrefs = new Set(hrefs)
    expect(uniqueHrefs.size).toBe(hrefs.length)
  })

  it('should have unique labels', () => {
    const labels = NAV_ITEMS.map(item => item.label)
    const uniqueLabels = new Set(labels)
    expect(uniqueLabels.size).toBe(labels.length)
  })

  it('should maintain correct order of navigation items', () => {
    expect(NAV_ITEMS[0].label).toBe('Dashboard')
    expect(NAV_ITEMS[1].label).toBe('Search')
    expect(NAV_ITEMS[2].label).toBe('Watchlist')
  })

  it('should be immutable (frozen)', () => {
    // Test that we can't accidentally modify the array
    expect(() => {
      (NAV_ITEMS as any).push({ href: '/test', label: 'Test' })
    }).toThrow()
  })
})