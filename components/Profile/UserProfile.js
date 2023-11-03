import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { auth } from '@/firebase';
import 'firebase/firestore';
import { UserAuth } from "@/context/AuthContext";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const { currentUser } = UserAuth();

  useEffect(() => {
      const fetchData = async () => {
      // Get the current user
      const user = UserAuth.currentUser;

      if (user) {
        // User is signed in.
        const currentUserId = user.uid;

        // Reference to your Firestore collection
        const db = firebase.firestore();
        const usersRef = db.collection('users');

        // Query data where id is equal to the current user's ID
        const query = usersRef.where('id', '==', currentUserId);

        try {
          const snapshot = await query.get();

          if (!snapshot.empty) {
            // Data with id equal to current user's ID found
            snapshot.forEach((doc) => {
              setUserData(doc.data());
            });
          } else {
            // Data not found
            console.log('No data found for the current user');
          }
        } catch (error) {
          // Handle errors here
          console.error('Error getting data:', error);
        }
      } else {
        // No user is signed in.
        console.log('No user signed in');
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      {userData ? (
        <div>
                  <h2>User Data:</h2>
                   <p>Name: {userData.displayName}</p>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
            <p>Loading...</p>
           
      )}
    </div>
  );
};

export default UserProfile;