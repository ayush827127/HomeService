import { gql, request } from "graphql-request";
const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_MASTER_URL +
  "/master";

const getCategory = async () => {
  const query = gql`
    query MyQuery {
      categories {
        icon {
          url
        }
        id
        name
        bgcolor {
          hex
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getAllBusinessList = async () => {
  const query = gql`
    query MyQuery {
      businessLists {
        about
        address
        category {
          name
        }
        email
        contactPerson
        images {
          url
        }
        name
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessListByCategory = async (category) => {
  const query =
    gql`query MyQuery {
    businessLists(where: {category: {name: "` +
    category +
    `"}}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      name
      id
      images {
        url
      }
    }
  }`;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessById = async (id) => {
  const query =
    gql`query MyQuery {
    businessLists(where: {id: "` +
    id +
    `"}) {
      about
      address
      contactPerson
      email
      name
      images {
        url
      }
      id
      category {
        name
      }
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createBooking = async (businessId,userEmail,userName,bookingTime,bookingDate) => {
  const query = gql`
    mutation CreateBooking {
      createBooking(
        data: {
          name: "`+userName+`"
          userEmail: "`+userEmail+`"
          date: "`+bookingDate+`"
          time: "`+bookingTime+`"
          progressStatus: Booked
          businessList: { connect: { id: "`+businessId+`" } }
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const  BussinessBookedSlot = async(businessId,date)=>{
  const query = gql`query BussinessBookedSlot {
    bookings(where: {businessList: {id: "`+businessId+`"}, date: "`+date+`"}) {
      date
      time
    }
  }`
  const result = await request(MASTER_URL,query);
  return result;
}

const GetUserBookingHistory = async (email) =>{
const query = gql`query GetUserBookingHistory {
  bookings(where: {userEmail: "`+email+`"}
  orderBy: publishedAt_DESC)
   {
    businessList {
      address
      contactPerson
      name
      images {
        url
      }
    }
    date
    time
  }
}
`
const result = await request(MASTER_URL,query);
return result;
}
export default {
  getCategory,
  getAllBusinessList,
  getBusinessListByCategory,
  getBusinessById,
  createBooking,
  BussinessBookedSlot,
  GetUserBookingHistory
};
