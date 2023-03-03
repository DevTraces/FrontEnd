import currentUser from "@/utils/currentUser";
import { GetServerSideProps } from "next";

const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const isValidUser = currentUser.isValidUser({ res, req });

  return !isValidUser
    ? {
        redirect: {
          destination: "/",
          permanent: false
        }
      }
    : {
        props: {}
      };
};

export default getServerSideProps;
