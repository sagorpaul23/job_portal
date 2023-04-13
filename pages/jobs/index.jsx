import {Button, Card, Col, Row, Typography} from "antd";
import {AiFillDollarCircle} from "react-icons/ai";
import {MdOutlineAccessTimeFilled, MdVerified} from "react-icons/md";
import {useState} from "react";
import styles from "../../styles/jobs.module.scss"
import Head from "next/head";
import logo from "../../public/download.png"
import Image from 'next/image'
import axios from "../../Config/axios";
import Link from "next/link";
import {nFormatter} from "../../helper/utils";

export async function getServerSideProps() {
    const res = await axios.get(`https://seashell-app-yubac.ondigitalocean.app/api/public/hr/hiring/job-openings`)
    return {
        props: {
            jobs: res.data.results
        }
    }
}

const Jobs = ({jobs}) => {
    const [allJobs] = useState(jobs)
    return (
        <div className={styles.container}>
            <Head>
                <title>All Jobs</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/download.png"/>
            </Head>
            <Card bordered={false}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Typography.Title level={3}>Latest Jobs</Typography.Title>
                    </Col>

                    {
                        allJobs.map((job) => (
                            <Col xs={24} sm={24} md={12} lg={12} xl={8} key={job?.id}>
                                <Card
                                    bordered={false}
                                    bodyStyle={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px'}}
                                >
                                    <div className={styles.card}>
                                        {/***Card header***/}
                                        <div className={styles.cardHeader}>
                                            {
                                                job.is_verified && (
                                                    <div className={styles.status}>
                                                        <MdVerified color='#5f63f2'/>
                                                        <span className={styles.verificationText}>
                                                        Verified Company
                                                    </span>
                                                    </div>
                                                )
                                            }
                                            <div className={styles.branding}>
                                                <Image alt={'logo'} className={styles.logo} src={logo}/>
                                                <div className={'company'}>
                                                    <Typography.Text
                                                        type="secondary"
                                                        className={styles.address}>
                                                        {job?.workplace?.address?.street_address} {", "}
                                                        {job?.workplace?.address?.state_province} {", "}
                                                        {job?.workplace?.address?.city}
                                                    </Typography.Text>
                                                    <Typography.Title
                                                        level={5}
                                                        className={styles.name}>
                                                        {job?.organization_name}
                                                    </Typography.Title>
                                                </div>
                                            </div>
                                        </div>
                                        {/***Card body***/}
                                        <div>
                                            <Link href={`/jobs/${job.id}`} state={{id: job.id}}>
                                                <Typography.Title level={4} style={{marginTop: 0}}>
                                                    {job?.job_title}
                                                </Typography.Title>
                                            </Link>

                                            <Typography.Text type="secondary">
                                                {job?.description?.length > 245 ? job?.description.slice(0, 245) + ' ...' : job?.description}
                                            </Typography.Text>

                                        </div>
                                        {/***Card Footer***/}
                                        <div className={styles.footer}>
                                            <div>
                                                <div className={styles.jobTypes}>
                                                    <MdOutlineAccessTimeFilled color='#5f63f2' size={15}/>
                                                    <Typography.Text
                                                        type="secondary">{job?.employment_type?.name}</Typography.Text>
                                                </div>
                                                <div className={styles.salaryRange}>
                                                    <AiFillDollarCircle color='#5f63f2' size={15}/>
                                                    <Typography.Text
                                                        type="secondary">
                                                        {job.salary_currency === "BDT" ? '৳' : '$'}{nFormatter(job?.min_salary)} -
                                                        {job.salary_currency === "BDT" ? ' ৳' : '$'}{nFormatter(job?.max_salary)} {" "}
                                                    </Typography.Text>
                                                </div>
                                            </div>
                                            <Link href={`/jobs/${job.id}/applyjob`} state={{id: job.id}}>
                                                <Button
                                                    className={styles.button}
                                                    type="primary">
                                                    APPLY NOW
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Card>
        </div>
    );
};

export default Jobs;