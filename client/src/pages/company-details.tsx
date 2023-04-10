import { Typography, Box, Stack } from "@pankod/refine-mui"
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core"
import { useParams, useNavigate } from "@pankod/refine-react-router-v6"
import { ChatBubble, Delete, Edit, Phone, Place, Star } from "@mui/icons-material"
import { CustomButton } from "components"

function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const CompanyDetails = () => {
  const navigate = useNavigate()
  const { data:user } = useGetIdentity()
  const { id } = useParams()
  const { mutate } = useDelete()
  const { queryResult } = useShow()

  const { data, isLoading, isError } = queryResult;
  // console.log(data)

  const companyDetails = data?.data ?? {}//in case the data doesn't exist

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error</div>

  const isCurrentUser = user.email === companyDetails.creator.email;

  const handleDeleteProperty = () => {
    const response = window.confirm('Are you sure you want to delete this gig?');
    if (response) {
      mutate({
        resource: 'companies',
        id: id as string,
      }, {
        onSuccess: () => {
          navigate('/companies');
        },
      });
    }
  };
  return (
    <Box bgcolor='#fcfcfc'
    padding='20px'
    borderRadius='15px'
    width='fit-content'>
      <Typography color='#11142d'fontSize={25} 
      fontWeight={700}>Details</Typography>
      <Box mt='20px' display='flex' flexDirection={{
        xs: 'column', lg: 'row'}} gap={4}>
          <Box flex={1} maxWidth={764}>
            <img src={companyDetails.photo} 
            alt={companyDetails.title}
            height={546}
            style={{ objectFit: 'cover', borderRadius: '10px'}}
            className='property_details-img'
            />
            {/* REMOVE STAR OPTION */}
            <Box mt='15px'>
              <Stack direction='row' justifyContent='space-between'
              flexWrap='wrap' alignItems='center'>
                <Typography fontSize={18} fontWeight={500}
                color='#11142d' textTransform='capitalize'>
                  {companyDetails.gigType}</Typography>
                <Box>
                  {[1, 2, 3, 4, 5].map((star) => 
                  <Star key={`star-${star}`} sx={{color: '#f2c94c'}}/>
                  )}
                </Box>
              </Stack>

              <Stack direction='row' justifyContent='space-between'
              flexWrap='wrap' alignItems='center'>
                <Box>
                <Typography fontSize={22} fontWeight={600}
                color='#11142d' textTransform='capitalize'>
                  {companyDetails.title}</Typography>
                  <Stack direction='row' mt={0.5} alignItems='center' gap={0.5}>
                    <Place sx={{ color: '#808191' }}/>
                    <Typography fontSize={14} color='#808191'>
                      {companyDetails.location}
                    </Typography>
                  </Stack>
                  </Box>
                  {/* PRICE */}
                  <Box>
                  <Typography fontSize={16} fontWeight={600} mt="10px" color="#11142D">Price</Typography>
                  <Stack direction="row" alignItems="flex-end" gap={1}>
                    <Typography fontSize={25} fontWeight={700} color="#475BE8">${companyDetails.price}</Typography>
                    <Typography fontSize={14} color="#808191" mb={0.5}>per month</Typography>
                  </Stack>
                </Box>
              </Stack>
              {/* DESCRIPTION */}
              <Stack mt="25px" direction="column" gap="10px">
                <Typography fontSize={18} color="#11142D">Description</Typography>
                <Typography fontSize={14} color="#808191">
                  {companyDetails.description}
                </Typography>
              </Stack>
            </Box>
          </Box>
          {/* CREATOR */}
          <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px">
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >

            <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
              <img
                src={checkImage(companyDetails.creator.avatar) 
                  ? companyDetails.creator.avatar 
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"}
                alt="avatar"
                width={90}
                height={90}
                style={{ borderRadius: '100%', objectFit: 'cover' }}
              />

              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142D">
                  {companyDetails.creator.name}</Typography>
                <Typography mt="5px" fontSize={14} fontWeight={400} color="#808191">Agent</Typography>
              </Box>

              <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: '#808191' }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">California, USA</Typography>
              </Stack>

              <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">
                {companyDetails.creator.allCompanies.length} Gigs</Typography>
            </Stack>

            <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
              <CustomButton
                // title={!isCurrentUser ? 'Message' : 'Edit'}
                title={!isCurrentUser ? '' : 'Edit'}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                // icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                icon={!isCurrentUser ? '' : <Edit />}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/companies/edit/${companyDetails._id}`);
                  }
                }}
              />
              <CustomButton
                // title={!isCurrentUser ? 'Call' : 'Delete'}
                title={!isCurrentUser ? '' : 'Delete'}
                backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                color="#FCFCFC"
                fullWidth
                // icon={!isCurrentUser ? <Phone /> : <Delete />}
                icon={!isCurrentUser ? '' : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>

          <Stack>
            <img
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: 'cover' }}
            />
          </Stack>

          <Box>
            <a href='https://calendly.com/pairsession/jobchallenge'>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
              />
              </a>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CompanyDetails