import { mockFAQs } from '../components/pages/profile/mockFAQs'; 

describe('mockFAQs', () => {
  it('should be an array of FAQs', () => {
    expect(Array.isArray(mockFAQs)).toBe(true);
  });

  it('should have the correct number of FAQs', () => {
    expect(mockFAQs.length).toBe(10);
  });

  it('should have each FAQ with the correct properties', () => {
    mockFAQs.forEach(faq => {
      expect(faq).toHaveProperty('id');
      expect(faq).toHaveProperty('name');
      expect(faq).toHaveProperty('answer');

      expect(typeof faq.id).toBe('string');
      expect(typeof faq.name).toBe('string');
      expect(typeof faq.answer).toBe('string');
    });
  });

  it('should contain specific FAQs', () => {
    const expectedFAQIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const actualFAQIds = mockFAQs.map(faq => faq.id);
    expect(actualFAQIds).toEqual(expect.arrayContaining(expectedFAQIds));
  });
});
