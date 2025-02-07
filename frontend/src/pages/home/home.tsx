import { Box, Button, Card, Flex, Separator, Text } from "@radix-ui/themes";
import React from "react";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-10">
            {/* Hero Section */}
            <section className="text-center max-w-3xl h-[80svh] flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold text-[var(--gray-11)]">
                    🚀 Build Habits, Win Your Goals, Conquer Success!
                </h1>
                <p className="text-lg text-[var(--gray-8)] mt-4">
                    Turn discipline into achievement. Track your progress, stay
                    consistent, and build the mindset of a winner. Your
                    entrepreneurial journey starts with daily habits!
                </p>
                <Button
                    className="mt-6 w-fit cursor-pointer"
                    onClick={() => navigate("/signup")}
                    size="4"
                >
                    Start Tracking Now
                </Button>
            </section>

            <Separator className="my-12 w-full" />

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                <FeatureCard
                    title="📈 Track Progress"
                    description="Monitor daily habits and stay consistent."
                />
                <FeatureCard
                    title="🏆 Achieve Goals"
                    description="Break goals into habits and win the long game."
                />
                <FeatureCard
                    title="💡 Build Consistency"
                    description="Stay accountable and never miss a day."
                />
            </section>

            <Separator className="my-12 w-full" />

            {/* Call-to-Action */}
            <section className="text-center min-h-[30svh] flex flex-col items-center justify-center">
                <h2 className="text-3xl font-semibold">
                    Ready to Build Your Winning Streak?
                </h2>
                <p className="text-gray-600 mt-2">
                    Join 1,000+ users tracking their habits daily.
                </p>
                <Button
                    className="mt-4 cursor-pointer"
                    onClick={() => navigate("/signup")}
                    size="3"
                >
                    Get Started for Free
                </Button>
            </section>
        </div>
    );
};

const FeatureCard: React.FC<{ title: string; description: string }> = ({
    title,
    description,
}) => (
    <Card className="shadow-lg hover:shadow-xl transition">
        <Flex gap="3" align="center">
            <Box>
                <Text as="div" size="2" weight="bold">
                    {title}
                </Text>
                <Text as="div" size="2" color="gray">
                    {description}
                </Text>
            </Box>
        </Flex>
    </Card>
);

export default Home;
