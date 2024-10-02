import { expect, test } from '@playwright/test'

test('can open page correctly', async ({ page }) => {
	await page.goto('http://localhost:4321/')
	await expect(page.getByRole('heading', { name: 'ToyB0x' })).toBeVisible()

	await page.getByText('Blog').click()
	await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()

	await page.getByText('Tools').click()
	await expect(page.getByRole('heading', { name: 'Tools' })).toBeVisible()
})
