/**
 * Test script to verify cacheSignal fixes
 * Demonstrates proper signal handling, timeout configuration, and error differentiation
 */

import { fetchWithCacheSignal, createApiClient } from './apiUtils';

/**
 * Test 1: Verify custom timeout configuration works
 */
export async function testCustomTimeout() {
  console.log('🧪 Testing custom timeout configuration...');

  const startTime = Date.now();

  try {
    // This should timeout after 100ms (custom timeout)
    await fetchWithCacheSignal('https://httpstat.us/200?sleep=500', {}, { timeout: 100 });
  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof Error && error.message.includes('timeout after 100ms')) {
      console.log('✅ Custom timeout works correctly');
      console.log(`   Duration: ${duration}ms (expected: ~100ms)`);
      return true;
    } else {
      console.log('❌ Custom timeout failed:', error);
      return false;
    }
  }

  console.log('❌ Expected timeout did not occur');
  return false;
}

/**
 * Test 2: Verify user-provided signal works
 */
export async function testUserSignal() {
  console.log('🧪 Testing user-provided signal cancellation...');

  const controller = new AbortController();

  // Cancel immediately
  controller.abort();

  try {
    await fetchWithCacheSignal('https://httpstat.us/200', { signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.message.includes('cancelled by user signal')) {
      console.log('✅ User signal cancellation works correctly');
      return true;
    } else {
      console.log('❌ User signal cancellation failed:', error);
      return false;
    }
  }

  console.log('❌ Expected user signal cancellation did not occur');
  return false;
}

/**
 * Test 3: Verify ApiClient respects custom timeout
 */
export async function testApiClientTimeout() {
  console.log('🧪 Testing ApiClient custom timeout...');

  const client = createApiClient({
    baseURL: 'https://httpstat.us',
    timeout: 200, // Custom timeout
  });

  const startTime = Date.now();

  try {
    await client.get('/200?sleep=1000'); // This would take 1 second
  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof Error && error.message.includes('timeout after 200ms')) {
      console.log('✅ ApiClient custom timeout works correctly');
      console.log(`   Duration: ${duration}ms (expected: ~200ms)`);
      return true;
    } else {
      console.log('❌ ApiClient custom timeout failed:', error);
      return false;
    }
  }

  console.log('❌ Expected ApiClient timeout did not occur');
  return false;
}

/**
 * Test 4: Verify proper error differentiation
 */
export async function testErrorDifferentiation() {
  console.log('🧪 Testing error differentiation...');

  const results = [];

  // Test timeout error
  try {
    await fetchWithCacheSignal('https://httpstat.us/200?sleep=200', {}, { timeout: 100 });
  } catch (error) {
    if (error instanceof Error && error.message.includes('timeout after 100ms')) {
      console.log('✅ Timeout error correctly identified');
      results.push(true);
    } else {
      console.log('❌ Timeout error misidentified:', error);
      results.push(false);
    }
  }

  // Test user signal error
  const controller = new AbortController();
  controller.abort();

  try {
    await fetchWithCacheSignal('https://httpstat.us/200', { signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.message.includes('cancelled by user signal')) {
      console.log('✅ User signal error correctly identified');
      results.push(true);
    } else {
      console.log('❌ User signal error misidentified:', error);
      results.push(false);
    }
  }

  return results.every(result => result === true);
}

/**
 * Run all tests
 */
export async function runCacheSignalTests() {
  console.log('🚀 Running cacheSignal fix verification tests...\n');

  const tests = [
    testCustomTimeout,
    testUserSignal,
    testApiClientTimeout,
    testErrorDifferentiation,
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log('❌ Test threw unexpected error:', error);
      failed++;
    }
    console.log(''); // Empty line between tests
  }

  console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log('🎉 All cacheSignal fixes verified successfully!');
    return true;
  } else {
    console.log('⚠️ Some tests failed - fixes may need additional work');
    return false;
  }
}

// Export for use in other modules
export default runCacheSignalTests;
