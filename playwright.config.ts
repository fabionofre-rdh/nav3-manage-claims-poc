import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["junit", { outputFile: "playwright-report/junit.xml" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "http://localhost:3000",
    headless: process.env.CI ? false : true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    storageState: "./playwright/storage-state/authenticated-storage-state.json",
    locale: "en-US",
    permissions: ["geolocation"],

    // Emulates the user timezone.
    timezoneId: "America/New_York",
    launchOptions: {
      args: ["--deny-permission-prompts"],
      ignoreDefaultArgs: ["--hide-scrollbars"],
    },
    ignoreHTTPSErrors: true,
    trace: "on-first-retry",
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.005,
      threshold: 0.25,
    },
    timeout: 10000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome large desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1022 },
      },
      testIgnore: /.*\.(mobile|tablet)\.test\.ts/,
    },
    {
      name: "chrome small desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 794 },
      },
      testIgnore: /.*\.(mobile|tablet)\.test\.ts/,
    },
    {
      name: "chrome small table",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
      },
      testIgnore: /.*\.(desktop|mobile)\.test\.ts/,
    },
    {
      name: "chrome xsmall mobile",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 360, height: 740 },
      },
      testIgnore: /.*\.(desktop|tablet|no-mobile)\.test\.ts/,
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start:backendless:playwright",
    url: "http://localhost:3000",
    timeout: 800 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
