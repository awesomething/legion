// import { Box } from '@mui/system'
import { useList } from "@pankod/refine-core";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  //TopAgent
} from "components";
import { Typography, Box, Stack } from "@pankod/refine-mui";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "companies",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestCompanies = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Longterm Monthly Gigs"
          value={14}
          series={[5, 9]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Part Time Gigs"
          value={50}
          series={[25, 25]}
          colors={["#475ae8", "#e4b8ef"]}
        />
        <PieChart
          title="Interviews Held"
          value={104}
          series={[74, 30]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Cities"
          value={5}
          series={[2, 3]}
          colors={["#475ae8", "#e4b8ef"]}
        />
      </Box>
      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Gigs
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestCompanies.map((company) => (
            <PropertyCard
              key={company._id}
              id={company._id}
              title={company.title}
              location={company.location}
              price={company.price}
              photo={company.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
