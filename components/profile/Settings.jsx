"use client"
import React, { useEffect, useState } from "react";
import { getCookie } from "@/utils/utils";
import { UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined } from "@ant-design/icons";

const Settings = ({ dict }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = getCookie('authToken');
        if (!authToken) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(authToken);
        const userId = userData?.user_id;

        if (!userId) {
          setError("User not found");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/users?userId=${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-[#232222] pt-[160px] pb-[100px]">
      <div className='container m-auto bg-[#D9D9D91A] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto'>
        <div className="flex text-white font-bold mb-[50px]">
          <div className='w-full'>
            <h2 className='text-2xl text-[#C7C7C7]'>{dict.settings || 'Settings'}</h2>
          </div>
        </div>

        {loading ? (
          <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
            <p className='ml-5'>{dict.loading || 'Loading settings...'}</p>
          </div>
        ) : error ? (
          <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-red-500'>
            <p className='ml-5'>{error}</p>
          </div>
        ) : user ? (
          <div className="content">
            {/* Student Information */}
            <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
              <div className='ml-5 flex items-center'>
                <UserOutlined className="mr-2" />
                <span className="text-[#C7C7C7]">{dict.student_name || 'Student Name'}:</span>
                <span className="ml-2">{user.name}</span>
              </div>
            </div>

            {/* Email */}
            <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
              <div className='ml-5 flex items-center'>
                <MailOutlined className="mr-2" />
                <span className="text-[#C7C7C7]">{dict.email || 'Email'}:</span>
                <span className="ml-2">{user.email}</span>
              </div>
            </div>

            {/* Parent Information */}
            <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
              <div className='ml-5 flex items-center'>
                <UserOutlined className="mr-2" />
                <span className="text-[#C7C7C7]">{dict.parent_name || 'Parent Name'}:</span>
                <span className="ml-2">{user.parent_name}</span>
              </div>
            </div>

            {/* Parent Phone */}
            <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
              <div className='ml-5 flex items-center'>
                <PhoneOutlined className="mr-2" />
                <span className="text-[#C7C7C7]">{dict.parent_phone || 'Parent Phone'}:</span>
                <span className="ml-2">{user?.parent_phone}</span>
              </div>
            </div>

            {/* Parent ID */}
            <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
              <div className='ml-5 flex items-center'>
                <IdcardOutlined className="mr-2" />
                <span className="text-[#C7C7C7]">{dict.parent_id || 'Parent ID'}:</span>
                <span className="ml-2">{user?.parent_id}</span>
              </div>
            </div>

            {/* Group ID */}
            <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
              <div className='ml-5 flex items-center'>
                <IdcardOutlined className="mr-2" />
                <span className="text-[#C7C7C7]">{dict.group_id || 'Group ID'}:</span>
                <span className="ml-2">{user?.group?.name}</span>
              </div>
            </div>

            {/* Account Created */}
            <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
              <div className='ml-5 flex items-center'>
                <span className="text-[#C7C7C7]">{dict.account_created || 'Account Created'}:</span>
                <span className="ml-2">{new Date(user?.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full border-b-1 border-[#C7C7C7] bg-[#C7C7C70A] h-[65px] flex items-center text-[19px] text-white'>
            <p className='ml-5'>{dict.no_data || 'No user data found'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 