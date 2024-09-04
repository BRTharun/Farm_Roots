import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../utils/store";
import { fetchVendorProfile } from "../../utils/vendorSlice";

//------------------------------
// Shimmer Effect Component
//------------------------------

const ShimmerEffect: React.FC = () => (
    <div className="animate-pulse">
        <div className="bg-gray-200 h-6 mb-4 w-1/2 rounded"></div>
        <div className="bg-gray-200 h-4 mb-4 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 mb-4 w-full rounded"></div>
        <div className="bg-gray-200 h-4 mb-4 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 mb-4 w-1/2 rounded"></div>
    </div>
);

//------------------------------
// VendorProfile Component
//------------------------------

const VendorProfile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, loading, error } = useSelector(
        (state: RootState) => state.vendor
    );

    useEffect(() => {
        dispatch(fetchVendorProfile());
    }, [dispatch]);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:ml-64 mt-12 w-full">
                <div className="mt-12 p-2">
                    {loading ? (
                        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                            <ShimmerEffect />
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-300 rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m0-7L3 9m9 5l9-5"
                                    />
                                </svg>
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                {error}
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Please try again later.
                            </p>
                        </div>
                    ) : !profile ? (
                        <div className="p-4">No profile data available.</div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                            <h1 className="text-2xl font-bold mb-4">
                                Vendor Profile
                            </h1>
                            <p>
                                <strong className="font-semibold">
                                    Company Name:
                                </strong>{" "}
                                {profile.companyName}
                            </p>
                            <p>
                                <strong className="font-semibold">
                                    Contact Name:
                                </strong>{" "}
                                {profile.contactName}
                            </p>
                            <p>
                                <strong className="font-semibold">
                                    Email:
                                </strong>{" "}
                                {profile.email}
                            </p>
                            <p>
                                <strong className="font-semibold">
                                    Phone:
                                </strong>{" "}
                                {profile.phone}
                            </p>
                            <p>
                                <strong className="font-semibold">Role:</strong>{" "}
                                {profile.role}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
