import type { FC } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DotsVertical from '@untitled-ui/icons-react/build/esm/DotsVertical';

interface FaqType {
  question: string;
  answer: any;
}

const faqs: FaqType[] = [
  {
    question: 'What is GeoVisor?',
    answer: (
      <>
        GeoVisor is an advanced geospatial platform designed for
        <strong>visualization, analytics, and WHOIS investigations.</strong>
        It provides interactive mapping, real-time data analysis, and domain ownership insights,
        allowing users to explore geographic trends and identify key information efficiently.
      </>
    ),
  },
  {
    question: 'Who can use GeoVisor?',
    answer: (
      <List>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Data analysts & GIS specialists</strong> who need advanced mapping and
                analytics.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Cybersecurity & investigative teams</strong> for WHOIS lookups and domain
                intelligence.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Businesses & decision-makers </strong>
                looking to understand geographic trends and market insights.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Researchers & policymakers </strong>
                working with spatial data for urban planning, environmental studies, and more.{' '}
              </>
            }
          />
        </ListItem>
      </List>
    ),
  },
  {
    question: 'What are the goals of GeoVisor?',
    answer: (
      <List>
        <ListItem>
          <ListItemText primary="GeoVisor aims to:" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Empower users </strong>
                with intuitive tools for geographic data visualization and analytics.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Enhance decision-making </strong>
                by providing real-time insights into geospatial and domain-related data.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Facilitate investigations </strong>
                with WHOIS tools to track domain ownership and online presence.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Integrate seamlessly </strong>
                into workflows, supporting professionals across multiple industries.
              </>
            }
          />
        </ListItem>
      </List>
    ),
  },
  {
    question: 'What types of projects can benefit from GeoVisor?',
    answer: (
      <List>
        <ListItem>
          <ListItemText primary="GeoVisor is designed for diverse use cases, including:" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Geospatial intelligence </strong>
                for business expansion and market research.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Cybersecurity investigations </strong>
                using WHOIS data for threat analysis.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Urban and environmental planning </strong>
                through advanced mapping tools.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Supply chain and logistics optimization </strong>
                by analyzing geographic data patterns.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Fraud detection and compliance monitoring </strong>
                using domain registration insights.
              </>
            }
          />
        </ListItem>
      </List>
    ),
  },
  {
    question: 'What advanced features are available with GeoVisor?',
    answer: (
      <List>
        <ListItem>
          <ListItemText primary="GeoVisor offers a range of powerful features, including:" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Interactive and multi-layered mapping </strong>
                for enhanced visualization.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Advanced analytics & AI-driven insights </strong>
                for pattern detection.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Real-time WHOIS lookup </strong>
                to analyze domain registrations and ownership history.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>Customizable dashboards </strong>
                for streamlined data management.
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                <strong>APIs and integrations </strong>
                to connect with other data platforms.
              </>
            }
          />
        </ListItem>
      </List>
    ),
  },
];

interface FaqProps {
  answer: string;
  question: string;
}

const Faq: FC<FaqProps> = (props) => {
  const { answer, question } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Stack
      onClick={() => setIsExpanded((prevState) => !prevState)}
      spacing={2}
      sx={{ cursor: 'pointer' }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="subtitle1">{question}</Typography>
        <SvgIcon>{isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}</SvgIcon>
      </Stack>
      <Collapse in={isExpanded}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {answer}
        </Typography>
      </Collapse>
    </Stack>
  );
};

Faq.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export const HomeFaqs: FC = () => {
  return (
    <Box
      sx={{ py: '120px' }}
      id="faq-section"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={2}>
              <Typography variant="h3">Everything You Need to Know</Typography>
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                Frequently Asked Questions
              </Typography>
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={4}>
              {faqs.map((faq, index) => (
                <Faq
                  key={index}
                  {...faq}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
