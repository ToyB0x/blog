import { expect, test } from '@playwright/test'

test('can open page correctly', async ({ page }) => {
	await page.goto('http://localhost:4321/')
	await expect(page.getByRole('heading', { name: 'ToyB0x' })).toBeVisible()

	await page.getByText('Blog').click()
	await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()

	await page.getByRole('link', { name: 'About', exact: true }).click()
	await expect(page).toHaveURL('http://localhost:4321/about')
	await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeVisible()
})
