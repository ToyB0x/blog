import { render } from '@testing-library/react'
import { NeonHeader } from './NeonHeader'

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeonHeader />)
    expect(baseElement).toBeTruthy()
  })
})
