export interface Companies {
  created: string;
  id: string;
  updated: string;
  name: string;
  contactNumber: string;
  contactPerson: string;
  contactPersonNumber: string;
  companyType: string;
  physicalAddress: {
      created: string;
      id: string;
      updated: string;
      houseNumber: string;
      streetName: string;
      city: string;
      country: string;
      current: boolean;
      type: string;
  };
  users: {
          firstName: string;
          LastName: string;
      };
  vehicles: {
          created: string;
          id: string;
          updated: string;
          model: string;
          make: string;
          year: string;
          color: string;
          registrationNumber: string;
          vinNumber: string;
          chassisNumber: string;
          engineNumber: string;
          state: string;
      };
}
