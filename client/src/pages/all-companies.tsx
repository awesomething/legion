//import React from 'react'
import { Add } from '@mui/icons-material'
import { useTable } from '@pankod/refine-core'
import { Box, Stack, Typography, TextField, Select, MenuItem } from '@pankod/refine-mui'
import { useNavigate } from '@pankod/refine-react-router-v6'
import { PropertyCard, CustomButton } from 'components'
import { useMemo } from 'react'
//import { propertyReferralsInfo } from 'constants'

const AllCompanies = () => {
  const navigate = useNavigate()

  const {
    tableQueryResult: { data, isLoading, isError },
    current, setCurrent,
    setPageSize, pageCount,
    sorter, setSorter,
    filters, setFilters,
  } = useTable()
  // console.log(data)
  const allCompanies = data?.data ?? [];
//coming from the backend as a result of res.header
  const currentPrice = sorter.find(
    (item) => item.field === 'price')?.order;
  
  const toggleSort = (field: string)=> {
    //sort in either ascending or descending order  
    setSorter([{ 
      field, 
      order: currentPrice ===  'asc' 
      ? 'desc' : 'asc'
    }])
  }

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => 
    ('field' in item ? item : []))
//filter everything by title
    return {
      title: logicalFilters.find((item) => 
      item.field === 'title')?.value || '',
      gigType: logicalFilters.find((item) => 
      item.field === 'gigType')?.value || '',
    }
  }, [filters])

  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Error...</Typography>
  return (
    <Box>
      <Box mt='20px' sx={{
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 3
      }}>
        <Stack direction='column' width="100%">
        <Typography fontSize={25}
        fontWeight={700}
        color='#11142d'>
          {!allCompanies.length 
          ? 'There are no hospitals' 
          : 'All Companies'
        }
        </Typography>
        <Box mb={2} mt={3} justifyContent='space-between'
        display='flex' width='84%' flexWrap='wrap'>
          <Box gap={2} mb= {{ xs: '20px', sm: '0'}}
        display='flex' flexWrap='wrap'>
          <CustomButton
            title={`Sort Price ${currentPrice === 
            'asc' ? '↑' : '↓'}`}
            handleClick={() => toggleSort('price')}
            backgroundColor='#475be8'
            color='#fcfcfc'
          />
          <TextField
            variant='outlined'
            color='info'
            placeholder='Search by title'
            value={currentFilterValues.title}
            onChange={(e)=>{
              setFilters([
                {
                  field: 'title',
                  operator: 'contains',
                  value: e.currentTarget.value 
                  ? e.currentTarget.value : undefined
                }
              ])
            }}
          />
          <Select
            variant='outlined'
            color='info'
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label'}}
            defaultValue=''
            value={currentFilterValues.gigType}
            onChange={(e)=>{
              setFilters([
                {
                  field: 'gigType',
                  operator: 'eq',
                  value: e.target.value
                }
              ], 'replace')
            }}
          >
            <MenuItem value=''>All</MenuItem>
            {['Landing Page', 'Bug Fixes', '3+ Page Website',
            'Frontend Web App', 'Backend Web App', 'Fullstack Web App', 
            'Mobile Application', 'Shortterm Contracts',
            'Yearly Contracts', 'Longterm Contracts', 'Other Gigs'].map((type) =>(
              <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
            ))}
          </Select>
          </Box>
        </Box>
        </Stack>
      </Box>

      <Stack justifyContent="space-between" direction="row" 
      alignItems="center">
        <CustomButton
        title="Add Gig"
        handleClick={() => navigate('/companies/create')}
        backgroundColor='#475be8'
        color='#fcfcfc'
        icon={<Add/>}
        />
      </Stack>
      <Box mt='20px' sx={{
        mt:'20px', display: 'flex', flexWrap: 'wrap', gap: 3
      }}>
        {allCompanies.map((company)=>(
          <PropertyCard
            key={company._id}
            id={company._id}
            title={company.title}
            price={company.price}
            location={company.location}
            photo={company.photo}
          />
        ))}
      </Box>
      {allCompanies.length > 0 && (
        <Box display='flex' gap={2}
        mt={3} flexWrap='wrap'>
          <CustomButton
            title='Previous'
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor='#475be8'
            color='#fcfcfc'
            disabled={!(current > 1)}
          />
          <Box display={{ xs: 'hidden', sm: 'flex'}}
          alignItems='center'gap='5px'>
            Page{' '}<strong>{current} of {pageCount}</strong>
          </Box>
          <CustomButton
            title='Next'
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor='#475be8'
            color='#fcfcfc'
            disabled={current === pageCount}
          />
          <Select
            variant='outlined'
            color='info'
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label'}}
            defaultValue={10}
            value=''
            onChange={(e)=> setPageSize(e.target.value 
              ? Number(e.target.value) : 10)}
          >
            {[10, 20, 30, 40, 50].map((size)=> (
            <MenuItem key={size} value={size}>Show {size}</MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllCompanies