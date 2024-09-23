import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../store/MainStore/store";
import {
  addVendorAddress,
  fetchVendorAddress,
  updateVendorAddress,
} from "../../utils/slices/newVendor";
import TopBar from "../../common/vendor/TopBar";
import Sidebar from "../../common/vendor/Sidebar";
import ShimmerEffect from "../../common/vendor/Shimmer";

const AddressSchema = Yup.object().shape({
  vendorShopName: Yup.string()
    .required("Vendor Shop Name is required")
    .max(100, "Vendor Shop Name is too long"),
  houseNoAndFloor: Yup.string()
    .required("House No and Floor is required")
    .max(50, "House No and Floor is too long"),
  buildingAndBlockNo: Yup.string()
    .required("Building and Block No is required")
    .max(50, "Building and Block No is too long"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[1-9][0-9]{2} ?[0-9]{3}$/, "Invalid Pincode format"),
  landmarkAndAreaName: Yup.string()
    .max(100, "Landmark and Area Name is too long")
    .nullable(),
});

const NewVendorProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vendorId = 1;
  const { address, loading, error } = useSelector(
    (state: RootState) => state.newProfile
  );
  console.log("dlkfl",address)

  useEffect(() => {
    if (vendorId) {
      dispatch(fetchVendorAddress({ vendorId }));
    }
  }, [dispatch, vendorId]);

  const [editingAddress, setEditingAddress] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState(address);

  useEffect(() => {
    if (address) {
      // Ensure address is always treated as an array
      const normalizedAddress = Array.isArray(address) ? address : [address];
      setUpdatedAddress(normalizedAddress.length > 0 ? normalizedAddress[0] : null);
    }
  }, [address]);

  const handleSaveAddress = (values: any) => {
    if (vendorId && values && values.vendorAddressId) {
      dispatch(
        updateVendorAddress({
          vendorId,
          addressId: values.vendorAddressId,
          addressData: values,
        })
      );
      setEditingAddress(false);
    }
  };

  const addNewAddress = (values: any) => {
    if (vendorId && values) {
      dispatch(addVendorAddress({ vendorId, addressData: values }));
      setEditingAddress(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-gray-800 p-4 text-white fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64 mt-12 w-full">
        <TopBar />
        <div className="mt-12 p-2">
          {loading ? (
            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
              <ShimmerEffect />
            </div>
          ) : error === "No addresses found for Vendor ID 1." ? (
            <div>
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => {
                  setUpdatedAddress({
                    vendorAddressId: 0,
                    vendorShopName: '',
                    houseNoAndFloor: '',
                    buildingAndBlockNo: '',
                    pincode: '',
                    landmarkAndAreaName: '',
                    vendorId: vendorId,
                  });
                  setEditingAddress(true);
                }}
              >
                Add Address
              </button>
              {editingAddress ? (
                <Formik
                  initialValues={updatedAddress}
                  validationSchema={AddressSchema}
                  onSubmit={(values) =>
                    values.vendorAddressId ? handleSaveAddress(values) : addNewAddress(values)
                  }
                >
                  {() => (
                    <Form className="bg-white shadow-md rounded-lg p-6">
                      <h1 className="text-2xl font-bold">Address</h1>

                      <div className="mb-4">
                        <label htmlFor="vendorShopName" className="block text-sm font-medium text-gray-700">Vendor Shop Name</label>
                        <Field
                          name="vendorShopName"
                          id="vendorShopName"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <ErrorMessage name="vendorShopName" component="div" className="text-red-600" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor = "houseNoAndFloor" className="block text-sm font-medium text-gray-700">House No and Floor</label>
                        <Field
                          name="houseNoAndFloor"
                          id ="houseNoAndFloor"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <ErrorMessage name="houseNoAndFloor" component="div" className="text-red-600" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor = "buildingAndBlockNo" className="block text-sm font-medium text-gray-700">Building and Block No</label>
                        <Field
                          name="buildingAndBlockNo"
                          id="buildingAndBlockNo"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <ErrorMessage name="buildingAndBlockNo" component="div" className="text-red-600" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                        <Field
                          name="pincode"
                          id="pincode"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <ErrorMessage name="pincode" component="div" className="text-red-600" />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="landmarkAndAreaName" className="block text-sm font-medium text-gray-700">Landmark and Area Name</label>
                        <Field
                          name="landmarkAndAreaName"
                          id="landmarkAndAreaName"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                        <ErrorMessage name="landmarkAndAreaName" component="div" className="text-red-600" />
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        {updatedAddress?.vendorAddressId ? "Save" : "Add"}
                      </button>
                    </Form>
                  )}
                </Formik>
              ) : null}
            </div>
          ) : (
            <div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Address</h1>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setEditingAddress(!editingAddress)}
                  >
                    {editingAddress ? "Cancel" : "Edit"}
                  </button>
                </div>
                {editingAddress ? (
                  <Formik
                    initialValues={updatedAddress}
                    validationSchema={AddressSchema}
                    onSubmit={(values) =>
                      values.vendorAddressId ? handleSaveAddress(values) : addNewAddress(values)
                    }
                  >
                    {() => (
                      <Form>
                        <div className="mb-4">
                          <label htmlFor="vendorShopName"className="block text-sm font-medium text-gray-700">Vendor Shop Name</label>
                          <Field
                            name="vendorShopName"
                            id="vendorShopName"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          />
                          <ErrorMessage name="vendorShopName" component="div" className="text-red-600" />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor ="houseNoAndFloor"className="block text-sm font-medium text-gray-700">House No and Floor</label>
                          <Field
                            name="houseNoAndFloor"
                            id="houseNoAndFloor"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          />
                          <ErrorMessage name="houseNoAndFloor" component="div" className="text-red-600" />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="buildingAndBlockNo" className="block text-sm font-medium text-gray-700">Building and Block No</label>
                          <Field
                            name="buildingAndBlockNo"
                            id="buildingAndBlockNo"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          />
                          <ErrorMessage name="buildingAndBlockNo" component="div" className="text-red-600" />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                          <Field
                            name="pincode"
                            id="pincode"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          />
                          <ErrorMessage name="pincode" component="div" className="text-red-600" />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="landmarkAndAreaName" className="block text-sm font-medium text-gray-700">Landmark and Area Name</label>
                          <Field
                            name="landmarkAndAreaName"
                            id="landmarkAndAreaName"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          />
                          <ErrorMessage name="landmarkAndAreaName" component="div" className="text-red-600" />
                        </div>

                        <button
                          type="submit"
                          className="bg-blue-500 text-white p-2 rounded"
                        >
                          {updatedAddress?.vendorAddressId ? "Save" : "Add"}
                        </button>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <div>
                    <p>
                      <strong className="font-semibold">Vendor Shop Name:</strong>{" "}
                      {address ? address[0]?.vendorShopName : null}
                    </p>
                    <p>
                      <strong className="font-semibold">House No and Floor:</strong>{" "}
                      {address ? address[0]?.houseNoAndFloor : null}
                    </p>
                    <p>
                      <strong className="font-semibold">Building and Block No:</strong>{" "}
                      {address ? address[0]?.buildingAndBlockNo : null}
                    </p>
                    <p>
                      <strong className="font-semibold">Pincode:</strong>{" "}
                      {address ? address[0]?.pincode : null}
                    </p>
                    <p>
                      <strong className="font-semibold">Landmark and Area Name:</strong>{" "}
                      {address ? address[0]?.landmarkAndAreaName : null}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewVendorProfile;