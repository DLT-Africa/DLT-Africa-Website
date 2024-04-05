"use client";

import {
	Button,
	Checkbox,
	Input,
	Option,
	Select,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
} from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa6";

const Application = () => {
	return (
		<div
			className="bg-auto  bg-no-repeat bg-left-top"
			style={{ backgroundImage: `url(images/application-page-bg.svg)` }}
		>
			<div
				className="bg-auto  bg-no-repeat bg-[right_bottom_16rem]"
				style={{ backgroundImage: `url(images/application-page-right-bg.svg)` }}
			>
				{/* Your content goes here */}
				<div className="flex flex-col pt-[103px] px-4 lg:px-12">
					<div className="grid grid-cols-1 md:grid-cols-2 place-content-between">
						<div className="p-4">
							<h2 className="text-4xl font-bold mb-4">
								Apply to Join Our Bootcamp Class
							</h2>
							<p className="mb-4 text-lg">
								Once you've applied, our admissions team will contact you by
								email to schedule a short interview in order to discuss your
								application.
							</p>
						</div>
						<div className="p-4 flex justify-end ">
							<div className=" border rounded-2xl border-gray-600 bg-[#FFF] pt-10 pr-10 pb-9 pl-6 max-w-[404px]">
								<div className="flex flex-col">
									<div className="flex  gap-2">
										{" "}
										<div className="mt-1 h-4 w-4">
											{" "}
											<FaCheck color="#FEA650" />
										</div>{" "}
										<p>Less than 5 minutes</p>
									</div>
									<div className="flex  gap-2">
										{" "}
										<div className="mt-1 h-4 w-4">
											{" "}
											<FaCheck color="#FEA650" />
										</div>{" "}
										<p>No prepayment and no commitment</p>
									</div>
									<div className="flex  gap-2">
										<div className="mt-1 h-4 w-4">
											{" "}
											<FaCheck color="#FEA650" />
										</div>{" "}
										<p>23000+ alumni have joined our community, so can you</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-5 mb-20 p-4">
						<div className="w-full   lg:min-w-[75%] 2xl:min-w-[70%] lg:max-w-[75%] 2xl:max-w-[70%]  rounded-2xl bg-[#FFEFD4] py-[69px] px-8 lg:px-[86px] mx-auto ">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 gap-x-14">
								<Input
									size="lg"
									name="firstName"
									variant="static"
									label="First Name"
									className="pl-4 text-xl"
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									placeholder="First Name"
								/>
								<Input
									size="lg"
									name="lastName"
									variant="static"
									label="Last Name"
									className="pl-4 text-xl"
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									placeholder="Last Name"
								/>
								<Input
									size="lg"
									name="email"
									variant="static"
									label="Email Address"
									className="pl-4 text-xl "
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									placeholder="Email Address"
								/>
								<Select
									label="State of Origin"
									variant="static"
									name="stateOfOrigin"
									className="pl-4 text-xl"
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									// value={value}
									// onChange={(val) => setValue(val)}
								>
									<Option value="html">Material Tailwind HTML</Option>
									<Option value="react">Material Tailwind React</Option>
									<Option value="vue">Material Tailwind Vue</Option>
									<Option value="angular">Material Tailwind Angular</Option>
									<Option value="svelte">Material Tailwind Svelte</Option>
								</Select>
								<Select
									label="Gender"
									variant="static"
									name="gender"
									className="pl-4 text-xl"
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									// value={value}
									// onChange={(val) => setValue(val)}
								>
									<Option value="male">Male</Option>
									<Option value="female">Female</Option>
								</Select>
								<Input
									size="lg"
									name="dob"
									type="date"
									variant="static"
									className="pl-4 text-xl text-gray-600"
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									label="Date of Birth"
									// className="text-gray-600"
								/>
								<Input
									size="lg"
									name="phoneNumber"
									variant="static"
									label="Phone Number"
									className="pl-4 text-xl"
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									placeholder="Phone Number"
								/>

								<Select
									label="Academic Qualification"
									variant="static"
									name="academicQualification"
									className="pl-4 text-xl"
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									// value={value}
									// onChange={(val) => setValue(val)}
								>
									<Option value="html">Material Tailwind HTML</Option>
									<Option value="react">Material Tailwind React</Option>
									<Option value="vue">Material Tailwind Vue</Option>
									<Option value="angular">Material Tailwind Angular</Option>
									<Option value="svelte">Material Tailwind Svelte</Option>
								</Select>
								<Input
									size="lg"
									name="courseSelected"
									variant="static"
									className="disabled:bg-transparent pl-4 text-xl disabled:text-blue-gray-300 disabled:border-b "
									label="Course Selected"
									// className="pl-4 text-xl"
									// labelProps={{
									//   className: "!text-black",
									// }}
									containerProps={{
										className: "h-14 ",
									}}
									labelProps={{
										className:
											"peer-disabled:text-black peer-disabled:peer-placeholder-shown:text-blue-gray-900",
									}}
									placeholder="Course Selected"
									value={"Fullstack"}
									disabled
								/>
								<Select
									label="Coding Experience"
									variant="static"
									name="codingExperience"
									className="pl-4 text-xl "
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									// value={value}
									// onChange={(val) => setValue(val)}
								>
									<Option value="html">Material Tailwind HTML</Option>
									<Option value="react">Material Tailwind React</Option>
									<Option value="vue">Material Tailwind Vue</Option>
									<Option value="angular">Material Tailwind Angular</Option>
									<Option value="svelte">Material Tailwind Svelte</Option>
								</Select>
								<Select
									label="Class Type"
									variant="static"
									name="classType"
									className="pl-4 text-xl "
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									// value={value}
									// onChange={(val) => setValue(val)}
								>
									<Option value="html">Material Tailwind HTML</Option>
									<Option value="react">Material Tailwind React</Option>
									<Option value="vue">Material Tailwind Vue</Option>
									<Option value="angular">Material Tailwind Angular</Option>
									<Option value="svelte">Material Tailwind Svelte</Option>
								</Select>
								<Select
									label="State of Residence"
									variant="static"
									name="stateOfResidence"
									className="pl-4 text-xl "
									labelProps={{
										className: "!text-black",
									}}
									containerProps={{
										className: "h-14 ",
									}}
									// value={value}
									// onChange={(val) => setValue(val)}
								>
									<Option value="html">Material Tailwind HTML</Option>
									<Option value="react">Material Tailwind React</Option>
									<Option value="vue">Material Tailwind Vue</Option>
									<Option value="angular">Material Tailwind Angular</Option>
									<Option value="svelte">Material Tailwind Svelte</Option>
								</Select>
							</div>
							<div className="mt-5 flex w-full flex-col gap-3">
								<List className="flex-col">
									<ListItem className="p-0 hover:bg-transparent">
										<label
											// htmlFor="horizontal-list-react"
											className="flex w-full cursor-pointer items-center  py-2"
										>
											<ListItemPrefix className="mr-3">
												<Checkbox
													// id="horizontal-list-react"
													ripple={false}
													className="hover:before:opacity-0 bg-white"
													containerProps={{
														className: "p-0",
													}}
												/>
											</ListItemPrefix>
											<Typography className="font-normal text-sm text-gray-600">
												I would like to be kept up to date with new training
												programs, events, promotions and marketing.
											</Typography>
										</label>
									</ListItem>
									<ListItem className="p-0 hover:bg-transparent">
										<label
											// htmlFor="horizontal-list-vue"
											className="flex w-full cursor-pointer items-center py-2"
										>
											<ListItemPrefix className="mr-3">
												<Checkbox
													// id="horizontal-list-vue"
													ripple={false}
													className="hover:before:opacity-0 bg-white"
													containerProps={{
														className: "p-0",
													}}
												/>
											</ListItemPrefix>
											<Typography className=" font-normal text-sm text-gray-600">
												By submitting this form, I accept DLT Africa's Privacy
												Policy.{" "}
											</Typography>
										</label>
									</ListItem>
								</List>
							</div>
							<Button
								size="lg"
								className="capitalize px-16 py-4 mt-5 bg-[#FC7C13]"
							>
								Register
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Application;
