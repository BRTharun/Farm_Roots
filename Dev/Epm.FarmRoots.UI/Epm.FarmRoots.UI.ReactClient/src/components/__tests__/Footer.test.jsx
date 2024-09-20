import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../common/Footer/UI/Footer'
// src/setupTests.js
import { describe, beforeEach, it, test, expect } from 'vitest';

describe('Footer Component', () => {
    test('renders Footer component without crashing', () => {
        const { container } = render(<Footer />);
        expect(container).toBeTruthy();
      });
  });