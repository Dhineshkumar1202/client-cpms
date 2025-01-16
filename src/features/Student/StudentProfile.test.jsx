import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentProfile from '../../pages/ProfilePage';
import * as apiService from '../../services/apiService';

// Mock the API service
jest.mock('./apiService');

describe('StudentProfile Component', () => {
  const mockStudent = {
    name: 'John Doe',
    contact: '1234567890',
    academicRecords: 'B.Sc Computer Science',
  };

  beforeEach(() => {
    apiService.fetchStudentProfile.mockResolvedValue(mockStudent);
  });

  test('renders student profile correctly', async () => {
    render(<StudentProfile studentId="123" />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('B.Sc Computer Science')).toBeInTheDocument();
    });
  });

  test('allows editing the profile', async () => {
    render(<StudentProfile studentId="123" />);

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Edit Profile/i));
    });

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Contact/i), {
      target: { value: '9876543210' },
    });

    apiService.updateStudentProfile.mockResolvedValue({
      ...mockStudent,
      name: 'Jane Doe',
      contact: '9876543210',
    });

    fireEvent.click(screen.getByText(/Save Changes/i));

    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('9876543210')).toBeInTheDocument();
    });
  });

  test('handles errors correctly', async () => {
    apiService.fetchStudentProfile.mockRejectedValue({
      message: 'Student not found',
    });

    render(<StudentProfile studentId="invalid-id" />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Student not found/i)).toBeInTheDocument();
    });
  });
});
