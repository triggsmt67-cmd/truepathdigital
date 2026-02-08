
import React from 'react';
import Hero from './Hero';
import FeatureSplit from './FeatureSplit';
import MissionSection from './MissionSection';
import Solutions from './Solutions';
import TrailGrid from './TrailGrid';
import AboutSection from './AboutSection';
import StakesSection from './StakesSection';
import SectionSeparator from './SectionSeparator';
import ComparisonSection from './ComparisonSection';
import QuoteSection from './QuoteSection';

const LandingPage: React.FC = () => {
    return (
        <>
            <Hero />
            <SectionSeparator number="01" title="REALITY CHECK" />
            <ComparisonSection />

            <SectionSeparator number="02" title="GROWTH ENGINE" />
            <FeatureSplit />
            <QuoteSection />

            <SectionSeparator number="03" title="THE MISSION" />
            <MissionSection />

            <SectionSeparator number="04" title="INFRASTRUCTURE" />
            <Solutions />

            <SectionSeparator number="05" title="THE PROTOCOL" />
            <TrailGrid />

            <SectionSeparator number="06" title="THE CHOICE" />
            <StakesSection />

            <SectionSeparator number="07" title="THE ARCHITECT" />
            <AboutSection />
        </>
    );
};

export default LandingPage;
