import React from 'react'
import { Flex, Layout, Typography, theme } from 'antd'
const { Footer } = Layout;
const { Text, Link } = Typography;
const LayoutFooter = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Footer style={{ marginTop: '5vh', boxShadow: '0 -5px 5px -5px #333', backgroundColor: colorBgContainer,  background:'#141414'}}>
            <Flex justify="center" align="center">
                <Text style={{ textAlign: 'center', color:'white'  }}>Open Source Full Stack Todo Web App <br /> Project GitHub Link: <Link href="https://github.com/Huseyinaydin48447/React" target="_blank">click here</Link> <br/>
                 <Text style={{color:'white'}}  >Developed By: <Link style={{textAlign:"center"}} href="https://github.com/Huseyinaydin48447" target="_blank">Hüseyin Aydın</Link></Text></Text>
            </Flex>
        </Footer>
    )
}

export default LayoutFooter