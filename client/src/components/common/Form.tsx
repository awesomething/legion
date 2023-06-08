import { Box, Typography, FormControl, FormHelperText, 
TextField, TextareaAutosize, Stack, Select, MenuItem, Button, padding, textTransform } 
from '@pankod/refine-mui'
import { FormProps } from 'interfaces/common'
import CustomButton from './CustomButton'

const Form = ({type, register, handleImageChange, handleSubmit, 
  formLoading, onFinishHandler, companyImage}: FormProps) => {
  return (
   <Box>
    <Typography fontSize={24}
        color="#11142d" fontWeight={700}>
      {type} a Gig
    </Typography>
    <Box mt={2.5}
    bgcolor='#fcfcfc'
    padding='20px'
    borderRadius='15px'>
      <form style={{
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap:'20px'}}
      onSubmit={handleSubmit(onFinishHandler)}>
        <FormControl>
          <FormHelperText sx={{
            fontSize:16, fontWeight: 500,
            color:'#11142d', margin:'10px 0'
          }}>Enter Company Name</FormHelperText>
          <TextField
          fullWidth
          required
          id='outlined-basic'
          color='info'
          variant='outlined'
          {...register('title', {required: true})}
          />
        </FormControl>
        <FormControl>
          <FormHelperText sx={{
            fontSize:16, fontWeight: 500,
            color:'#11142d', margin:'10px 0'
          }}>Enter Gig Description</FormHelperText>
          <TextareaAutosize
          minRows={5}
          required
          placeholder='Write description'
          color='info'
          style={{
            width: '100%',
            background: 'transparent',
            fontSize: '16px',
            borderColor: 'rgba(0,0,0,0.23)',
            borderRadius: 6,
            padding: 10,
            color: '#919191',
          }}
          {...register('description', {required: true})}
          />
        </FormControl>
          <Stack direction='row' gap={4}>
          <FormControl sx={{flex: 1}}>
          <FormHelperText sx={{
            fontSize:16, fontWeight: 500,
            color:'#11142d', margin:'10px 0'
          }}>
            Select Gig Type
          </FormHelperText>
          <Select
          variant='outlined'
          color='info'
          displayEmpty
          required
          inputProps={{ 'aria-label': 'Without label'}}
          defaultValue='Landing Page'
          {...register('gigType', {required: true})}
          >
            {/* <MenuItem value='landing page'>Landing Page</MenuItem>
            <MenuItem value='bug fixes'>Bug Fixes</MenuItem>
            <MenuItem value='multipage website'>3+ Page Website</MenuItem>
            <MenuItem value='frontend web app'>Frontend Web App</MenuItem>
            <MenuItem value='backend web app'>Backend Web App</MenuItem>
            <MenuItem value='fullstack web app'>Fullstack Web App</MenuItem>
            <MenuItem value='mobile application'>Mobile Application</MenuItem> */}
            <MenuItem value='shortterm contracts'>Shortterm Contracts</MenuItem>
            <MenuItem value='yearly contracts'>Yearly Contracts</MenuItem>
            <MenuItem value='longterm contracts'>Longterm Contracts</MenuItem>
            {/* <MenuItem value='other gigs'>Other Gigs</MenuItem> */}
          </Select>
          </FormControl>
          <FormControl>
          <FormHelperText sx={{
            fontSize:16, fontWeight: 500,
            color:'#11142d', margin:'10px 0'
          }}>Enter Monthly Budget</FormHelperText>
          <TextField
          fullWidth
          required
          id='outlined-basic'
          color='info'
          type='number'
          variant='outlined'
          {...register('price', {required: true})}
          />
        </FormControl>
          </Stack>
          <FormControl>
          <FormHelperText sx={{
            fontSize:16, fontWeight: 500,
            color:'#11142d', margin:'10px 0'
          }}>Enter Location</FormHelperText>
          <TextField
          fullWidth
          required
          id='outlined-basic'
          color='info'
          variant='outlined'
          {...register('location', {required: true})}
          />
        </FormControl>
        <Stack direction='column' gap={1}
        justifyContent='center' mb={2}>
          <Stack direction='row' gap={2}>
            <Typography fontSize={16} my='10px'color="#11142d" 
            fontWeight={500}>Company Image</Typography>
            <Button component='label' sx={{
              width:'fit-content', color:'#2ed480',
              textTransform: 'capitalize', fontSize: '16'
            }}>
              Upload *link to image, logo, building photo, etc
              <input
              hidden
              accept='application/vnd.ms-powerpoint, presentationml.slideshow, image/gif, image/*'
              type='file'
              onChange={(e) => {
                // @ts-ignore
                handleImageChange(e.target.files[0])
              }}
              />
            </Button>
          </Stack>
          <Typography fontSize={14} color='#808191' sx={{
            wordBreak: 'break-all'
          }}>{companyImage?.name}</Typography>
        </Stack>
        <CustomButton
        type='submit'
        title={formLoading ? 'Submitting...' : 'Submit'}
        backgroundColor='#475be8'
        color='#fcfcfc'
        />
      </form>

    </Box>
   </Box>
  )
}

export default Form