import { useRouter } from 'next/router'
import React from 'react'
import Layout from "../../components/Layout";
import { useSelector } from 'react-redux';
import { withRedux } from '../../lib/redux'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, CardText,CardSubtitle } from 'reactstrap';
import NumberFormat from 'react-number-format'

const Brew = () => {
  const typeMap = {
    micro: 'MicroBrew',
    brewpub: 'Pub',
    planning: 'Planning',
    contract: 'Contract',
    proprietor: 'Proprietor',
    regional: 'Regional',
    large: 'LargeBrew'
  }
  const count = useSelector(state => state)
  const router = useRouter()
  const id = router.query.id
  let b
  if (count.data) {
    b = count.data.find((e) => {
      return e.id === parseInt(id)
    })
  } else {
    return (<Layout></Layout>)
  }
  return (
    <Layout>
      <Card>
      <CardHeader>{b.name}</CardHeader>
      <CardBody>
        <CardTitle>{typeMap[b.brewery_type]}</CardTitle>
        <CardSubtitle><NumberFormat displayType="text" value={b.phone} format="(###) ###-####" mask="_" /></CardSubtitle>
        <CardText>
          {b.street}<br />
          {b.city}, {b.state} {b.postal_code}
        </CardText>
      </CardBody>
      <CardFooter>
        <a 
          href={b.website_url} 
          target="blank" 
          style={{textDecoration: 'none', color: 'darkgrey' }}
          >
              {b.website_url}
        </a>
      </CardFooter>
    </Card>
    </Layout>
  )
}

export default withRedux(Brew);
