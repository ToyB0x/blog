import { FiGithub } from 'react-icons/fi'
import { render } from '@testing-library/react'
import { NeonLinkIcon } from './NeonLinkIcon'

describe('LinkIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <NeonLinkIcon href="https://github.com" icon={FiGithub} />,
    )
    expect(baseElement).toBeTruthy()
  })
})
