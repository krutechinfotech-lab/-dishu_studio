import requests
import sys
from datetime import datetime
import json
import uuid

class DishuStudioAPITester:
    def __init__(self, base_url="https://photo-studios.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        
    def log_test(self, name, success, details=""):
        """Log a test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")
    
    def test_health_endpoint(self):
        """Test the health endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}, Response: {response.json() if success else 'Error'}"
            self.log_test("Health Check", success, details)
            return success
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False
    
    def test_create_booking(self):
        """Test booking creation"""
        test_booking = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@dishu.studio",
            "phone": "+91 98765 43210",
            "service_type": "wedding",
            "message": "Test wedding booking",
            "preferred_date": "2025-12-31"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/bookings", 
                json=test_booking,
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                booking_data = response.json()
                if booking_data.get('id'):
                    # Store the booking ID for other tests
                    self.test_booking_id = booking_data['id']
                    details += f", Booking ID: {booking_data['id']}"
                else:
                    success = False
                    details += ", Missing booking ID in response"
            
            self.log_test("Create Booking", success, details)
            return success
        except Exception as e:
            self.log_test("Create Booking", False, f"Exception: {str(e)}")
            return False
    
    def test_get_bookings(self):
        """Test getting all bookings"""
        try:
            response = requests.get(f"{self.base_url}/bookings", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                bookings = response.json()
                details += f", Found {len(bookings)} bookings"
                
                # Validate booking structure
                if bookings and isinstance(bookings, list):
                    first_booking = bookings[0]
                    required_fields = ['id', 'name', 'email', 'phone', 'service_type', 'status']
                    missing_fields = [field for field in required_fields if field not in first_booking]
                    if missing_fields:
                        success = False
                        details += f", Missing fields: {missing_fields}"
            
            self.log_test("Get All Bookings", success, details)
            return success
        except Exception as e:
            self.log_test("Get All Bookings", False, f"Exception: {str(e)}")
            return False
    
    def test_get_single_booking(self):
        """Test getting a single booking by ID"""
        if not hasattr(self, 'test_booking_id'):
            self.log_test("Get Single Booking", False, "No booking ID available from create test")
            return False
        
        try:
            response = requests.get(f"{self.base_url}/bookings/{self.test_booking_id}", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                booking = response.json()
                if booking.get('id') == self.test_booking_id:
                    details += f", Retrieved booking for ID: {self.test_booking_id}"
                else:
                    success = False
                    details += f", ID mismatch: expected {self.test_booking_id}, got {booking.get('id')}"
            
            self.log_test("Get Single Booking", success, details)
            return success
        except Exception as e:
            self.log_test("Get Single Booking", False, f"Exception: {str(e)}")
            return False
    
    def test_update_booking(self):
        """Test updating a booking"""
        if not hasattr(self, 'test_booking_id'):
            self.log_test("Update Booking", False, "No booking ID available from create test")
            return False
        
        update_data = {
            "status": "confirmed",
            "message": "Updated message for testing"
        }
        
        try:
            response = requests.put(
                f"{self.base_url}/bookings/{self.test_booking_id}", 
                json=update_data,
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                updated_booking = response.json()
                if updated_booking.get('status') == 'confirmed':
                    details += f", Status updated to: {updated_booking.get('status')}"
                else:
                    success = False
                    details += f", Status not updated correctly: {updated_booking.get('status')}"
            
            self.log_test("Update Booking", success, details)
            return success
        except Exception as e:
            self.log_test("Update Booking", False, f"Exception: {str(e)}")
            return False
    
    def test_delete_booking(self):
        """Test deleting a booking"""
        if not hasattr(self, 'test_booking_id'):
            self.log_test("Delete Booking", False, "No booking ID available from create test")
            return False
        
        try:
            response = requests.delete(f"{self.base_url}/bookings/{self.test_booking_id}", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                # Verify deletion by trying to get the booking
                get_response = requests.get(f"{self.base_url}/bookings/{self.test_booking_id}", timeout=10)
                if get_response.status_code == 404:
                    details += ", Booking successfully deleted"
                else:
                    success = False
                    details += ", Booking still exists after deletion"
            
            self.log_test("Delete Booking", success, details)
            return success
        except Exception as e:
            self.log_test("Delete Booking", False, f"Exception: {str(e)}")
            return False
    
    def test_create_contact(self):
        """Test contact form submission"""
        test_contact = {
            "name": f"Contact Test {datetime.now().strftime('%H%M%S')}",
            "email": "contact@test.com",
            "phone": "+91 87654 32109",
            "message": "This is a test contact message for API testing"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/contact", 
                json=test_contact,
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                contact_data = response.json()
                if contact_data.get('id'):
                    self.test_contact_id = contact_data['id']
                    details += f", Contact ID: {contact_data['id']}"
                else:
                    success = False
                    details += ", Missing contact ID in response"
            
            self.log_test("Create Contact", success, details)
            return success
        except Exception as e:
            self.log_test("Create Contact", False, f"Exception: {str(e)}")
            return False
    
    def test_get_contacts(self):
        """Test getting all contacts"""
        try:
            response = requests.get(f"{self.base_url}/contacts", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                contacts = response.json()
                details += f", Found {len(contacts)} contacts"
                
                # Validate contact structure
                if contacts and isinstance(contacts, list):
                    first_contact = contacts[0]
                    required_fields = ['id', 'name', 'email', 'phone', 'message']
                    missing_fields = [field for field in required_fields if field not in first_contact]
                    if missing_fields:
                        success = False
                        details += f", Missing fields: {missing_fields}"
            
            self.log_test("Get All Contacts", success, details)
            return success
        except Exception as e:
            self.log_test("Get All Contacts", False, f"Exception: {str(e)}")
            return False
    
    def test_delete_contact(self):
        """Test deleting a contact"""
        if not hasattr(self, 'test_contact_id'):
            self.log_test("Delete Contact", False, "No contact ID available from create test")
            return False
        
        try:
            response = requests.delete(f"{self.base_url}/contacts/{self.test_contact_id}", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            self.log_test("Delete Contact", success, details)
            return success
        except Exception as e:
            self.log_test("Delete Contact", False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Dishu Studio API Tests...")
        print("="*50)
        
        # Test sequence
        tests = [
            self.test_health_endpoint,
            self.test_create_booking,
            self.test_get_bookings,
            self.test_get_single_booking,
            self.test_update_booking,
            self.test_create_contact,
            self.test_get_contacts,
            # Delete tests at the end
            self.test_delete_booking,
            self.test_delete_contact,
        ]
        
        for test in tests:
            test()
            print()  # Add spacing between tests
        
        # Summary
        print("="*50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print(f"❌ {self.tests_run - self.tests_passed} tests failed")
            
            # Print failed tests
            failed_tests = [t for t in self.test_results if not t['success']]
            if failed_tests:
                print("\n❌ Failed Tests:")
                for test in failed_tests:
                    print(f"  • {test['name']}: {test['details']}")
            
            return 1

def main():
    tester = DishuStudioAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())