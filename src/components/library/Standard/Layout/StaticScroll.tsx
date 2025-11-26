import React, { useEffect, useRef } from 'react';

function Standard_StaticScroll({ children }: { children: React.ReactNode }) {
    const staticScrollRef = useRef<HTMLOListElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const staticScroll = staticScrollRef.current;
        const imageContainer = imageContainerRef.current;

        if (staticScroll && imageContainer) {
            const transition_offset = 40; // pixels to offset the transition by
            const scale_maximum = 1.05; // sets the maximum zoom size

            const interior_offsets = Array.from(staticScroll.children).map(li => (li as HTMLElement).offsetTop);

            const handleScroll = () => {
                // Finds the index of the active image
                let active_image_index = 0;
                for (const offset of interior_offsets) {
                    if (staticScroll.scrollTop > offset) {
                        active_image_index = interior_offsets.indexOf(offset);
                    }
                }

                // set the correct styling of each image
                Array.from(imageContainer.children).forEach((element: any, index) => {
                    const transition_percentage = 1 - (interior_offsets[active_image_index + 1] - staticScroll.scrollTop) / transition_offset;
                    switch (index) {
                        case active_image_index + 1:
                            element.classList.remove('hidden');
                            element.style.opacity = '0';
                            if (staticScroll.scrollTop > interior_offsets[active_image_index + 1] - transition_offset) {
                                element.style.opacity = `${transition_percentage}`;
                            }
                            break;
                        case active_image_index:
                            element.classList.remove('hidden');
                            element.style.opacity = '1';
                            if (staticScroll.scrollTop > interior_offsets[active_image_index + 1] - transition_offset) {
                                element.style.transform = `scale(${1 + transition_percentage * (scale_maximum - 1)})`;
                            }
                            break;
                        default:
                            element.classList.add('hidden');
                            break;
                    }
                });
            };

            staticScroll.addEventListener('scroll', handleScroll);

            return () => {
                staticScroll.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div className="container mb-20 lg:mb-28 mt-10 lg:mt-14 block-wrapper kinetix-block static-scroll">
            <div className="lg:flex lg:justify-between aos-init aos-animate" data-aos="fade-up">
                <div ref={imageContainerRef} className="relative overflow-hidden aspect-square rounded-xl my-6 lg:m-0 lg:mr-16 lg:basis-5/12">
                    <img decoding="async" width="965" height="910" src="https://svu.edu/wp-content/uploads/2023/10/classroom_desktop.jpg" className="absolute aspect-square object-cover w-full inset-0 rounded-xl" alt="Students in a classroom" />
                    <img loading="lazy" decoding="async" width="1024" height="683" src="https://svu.edu/wp-content/uploads/2024/02/20220601_MAR_Summer-on-Campus_EF_0062-1024x683.webp" className="absolute aspect-square object-cover w-full inset-0 rounded-xl" alt="Southern Virginia University campus in the summer." style={{ opacity: 0 }} />
                    <img loading="lazy" decoding="async" width="965" height="910" src="https://svu.edu/wp-content/uploads/2023/10/athleticcamps_desktop.jpg" className="absolute aspect-square object-cover w-full inset-0 rounded-xl hidden" alt="Women Soccer players celebrating" />
                    <img loading="lazy" decoding="async" width="965" height="910" src="https://svu.edu/wp-content/uploads/2023/10/auditions_desktop.jpg" className="absolute aspect-square object-cover w-full inset-0 rounded-xl hidden" alt="Emma Vasquez singing" />
                </div>

                <ol ref={staticScrollRef} className="relative h-96 overflow-x-hidden overflow-y-scroll lg:basis-6/12 lg:my-auto lg:h-104 pr-2 lg:pr-12 md:scrollbar-thumb-rounded md:scrollbar-track-rounded scrollbar-thumb-gray-boulder scrollbar-track-gray-mercury">
                    <li className="min-h-full">
                        <div className="static-scroll-counter h6 text-red-bright font-extrabold pb-4"></div>
                        <h3 className="h2 text-gray-metal">Classroom Experience</h3>
                        <p className="p2 text-black py-2">Prospective students are given the opportunity to sit in on classes in order to experience the top-tier education available at Southern Virginia University. For a list of classes available, contact your admissions counselor.</p>
                    </li>
                    <li className="min-h-full">
                        <div className="static-scroll-counter h6 text-red-bright font-extrabold pb-4"></div>
                        <h3 className="h2 text-gray-metal">Campus Tours</h3>
                        <p className="p2 text-black py-2">Southern Virginia University’s campus is historic and beautiful. As part of a campus visit, admission counselors lead tours of campus facilities for prospective students and their parents, offering insights and information about the past, present, and future of the school.</p>
                    </li>
                    <li className="min-h-full">
                        <div className="static-scroll-counter h6 text-red-bright font-extrabold pb-4"></div>
                        <h3 className="h2 text-gray-metal">Athletic ID Camps</h3>
                        <p className="p2 text-black py-2">Showcase your talents for one of our 28 athletic teams. If you are interested in trying out for a team, you may register for an Athletic ID Camp, contact a coach, or talk with your admissions counselor to schedule a workout.</p>
                    </li>
                    <li className="min-h-full">
                        <div className="static-scroll-counter h6 text-red-bright font-extrabold pb-4"></div>
                        <h3 className="h2 text-gray-metal">Performing Arts Auditions</h3>
                        <p className="p2 text-black py-2">Students visiting campus may audition for scholarships in the performing arts, including instrumental, vocal, or theatrical scholarships. Contact your admissions counselor to schedule an individual audition.</p>
                    </li>
                </ol>
            </div>
        </div>
    );
}

const bindings = {
    children: [],
    props: {}
}

export default [Standard_StaticScroll, bindings, "Static Scroll", true];