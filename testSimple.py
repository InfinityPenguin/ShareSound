"""
Each file that starts with test... in this directory is scanned for subclasses of unittest.TestCase or testLib.RestTestCase
"""

import unittest
import os
import testLib

# class TestUnit(testLib.RestTestCase):
#     # """Issue a REST API request to run the unit tests, and analyze the result"""
#     # def testUnit(self):
#     #     respData = self.makeRequest("/TESTAPI/unitTests", method="POST")
#     #     self.assertTrue('output' in respData)
#     #     print ("Unit tests output:\n"+
#     #            "\n***** ".join(respData['output'].split("\n")))
#     #     self.assertTrue('totalTests' in respData)
#     #     print "***** Reported "+str(respData['totalTests'])+" unit tests. nrFailed="+str(respData['nrFailed'])
#     #     # When we test the actual project, we require at least 10 unit tests
#     #     minimumTests = 10
#     #     if "SAMPLE_APP" in os.environ:
#     #         minimumTests = 4
#     #     self.assertTrue(respData['totalTests'] >= minimumTests,
#     #                     "at least "+str(minimumTests)+" unit tests. Found only "+str(respData['totalTests'])+". use SAMPLE_APP=1 if this is the sample app")
#     #     self.assertEquals(0, respData['nrFailed'])


        
class TestAddUser(testLib.RestTestCase):
    """Test adding users"""
    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testAdd1(self):
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : 'user1', 'password' : 'password'} )
        self.assertEqual(respData['status code'], 1)

    def testAdd2(self):
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : 'user1', 'password' : 'password'} )
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : 'user1', 'password' : 'password'} )
        self.assertEqual(respData['status code'], -1)
    
    def testAdd3(self):
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : '', 'password' : 'password'} )
        self.assertEqual(respData['status code'], -2)
        respData2 = self.makeRequest("/api/users", method="POST", data = { 'username' : ' ', 'password' : 'password'} )
        self.assertEqual(respData2['status code'], -2)

    def testAdd4(self):
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : 'user', 'password' : ' '} )
        self.assertEqual(respData['status code'], -3)
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : 'user', 'password' : 'a'} )
        self.assertEqual(respData['status code'], -3)
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : 'user', 'password' : 'a'} )
        self.assertEqual(respData['status code'], -3)
    def testLogin(self):
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : 'user', 'password' : 'password'} )
        respData = self.makeRequest("/api/users/login", method="POST", data = { 'username' : 'user', 'password' : 'password'} )
        self.assertEqual(respData['status code'], 1)
    def testLogin2(self):
        respData = self.makeRequest("/api/users", method="POST", data = { 'username' : 'user', 'password' : 'pass'} )
        respData = self.makeRequest("/api/users/login", method="POST", data = { 'username' : 'user', 'password' : 'wrong'} )
        self.assertEqual(respData['status code'], -1)
