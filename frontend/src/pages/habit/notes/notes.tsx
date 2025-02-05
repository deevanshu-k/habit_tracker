import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

const Notes: React.FC = () => {
    return (
        <div>
            <Flex as="div" direction={"row"} justify={"between"}>
                <Text>Notes</Text>
                <Button
                    variant="ghost"
                    radius="none"
                    className="cursor-pointer"
                >
                    New Note
                </Button>
            </Flex>
            <Flex direction={"column"} p={"4"} gap="3">
                {Array.from({ length: 5 }).map(() => (
                    <Box className="border border-gray-500 p-3 w-full">
                        <Text as="p" size={"1"} color="gray">
                            18 March
                        </Text>
                        <Text as="div" truncate>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusantium quibusdam doloribus corporis,
                            impedit deserunt eaque illum laudantium, totam ullam
                            sint eius consequatur magnam nam vitae. Temporibus
                            officiis ab impedit eius sit labore in illo
                            distinctio veniam velit exercitationem explicabo
                            ducimus fugit a voluptates nesciunt, quam cum eaque.
                            Dolore perferendis recusandae optio quasi quod?
                            Doloremque minima dicta labore unde, veritatis
                            deserunt incidunt, culpa odit quod quo explicabo?
                            Est totam veritatis delectus soluta blanditiis culpa
                            quos suscipit quidem sequi minus aliquam id dolores
                            corrupti vel aliquid, fugit incidunt nisi
                            consequuntur quia sint adipisci necessitatibus
                            voluptate fuga. Impedit perspiciatis sint natus
                            voluptate assumenda quas? Accusantium assumenda
                            labore odio eveniet quas vel commodi necessitatibus
                            ullam, atque reprehenderit minima officia ex, porro
                            repellendus consequatur beatae, nesciunt itaque enim
                            impedit nam quisquam delectus illum ipsam quo. Quae,
                            corrupti autem deleniti vel eius est? Quod aliquam
                            quis beatae officiis in cumque illo esse, voluptates
                            eum, sint suscipit expedita cum necessitatibus rem
                            nulla molestiae iusto est ut odit nostrum possimus
                            debitis totam asperiores. Enim similique adipisci
                            voluptate aperiam quidem aliquam, tenetur provident
                            fugiat recusandae, culpa sint nostrum ut? Explicabo
                            architecto consequatur veritatis? Rerum commodi,
                            aspernatur itaque sint atque neque consequatur,
                            magnam distinctio eos eveniet facere asperiores
                            suscipit totam.
                        </Text>
                    </Box>
                ))}
            </Flex>
        </div>
    );
};

export default Notes;
