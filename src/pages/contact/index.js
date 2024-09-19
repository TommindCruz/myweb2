import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { Box, darken, lighten } from "@mui/material";

// ** Vendor Imports
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// **MUI Imports
import { Typography, Button, useMediaQuery, CircularProgress } from "@mui/material";

import {
	ImageContentSection,
	TextContentWrap,
	TextContentHeading,
	TextContentDescription,
	ContactContentSection,
	ContactTextContentWrap
} from "@/components/global-contents/index";
import { useTheme } from "@mui/material";
import { useThemeCtx } from "@/context/theme";
import ThemeDrawer from "@/components/theme-drawer";
import useIsScreenSizes from "@/utils/get-is-screen-sizes";
import GoogleMaps from "@/components/google-maps";

const ThemedFormControl = dynamic(() => import("@/components/themed-form-control"), { ssr: false });

function ThemedButton({ children, props }) {
	return (
		<Button
			variant="contained"
			size="large"
			type="submit"
			disableElevation
			{...props}
			sx={{
				backgroundColor: (theme) =>
					theme.palette.mode === "light" ? darken("#CBCBCB", 0.1) : "#2d2d2d",
				border: (theme) => `2px solid ${theme.palette.background.paper}`,
				"&:hover": {
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? darken(theme.palette.common.silver, 0.15)
							: lighten(theme.palette.common.black, 0.1),
					color: (theme) => (theme.palette.mode === "light" ? "#2d2d2d" : darken("#CBCBCB", 0.1))
				},
				color: (theme) => (theme.palette.mode === "light" ? "#2d2d2d" : darken("#CBCBCB", 0.1)),
				fontWeight: 600
			}}>
			{children}
		</Button>
	);
}

const Contact = () => {
	const theme = useTheme();
	const { isDark } = useThemeCtx();
	const { isLaptop, isLaptopL, isDesktop } = useIsScreenSizes();

	const isBigView = isLaptop || isLaptopL || isDesktop;

	const [submitting, setSubmitting] = useState(false);

	const schema = yup.object().shape({
		fullName: yup.string().required(),
		companyName: yup.string().required(),
		email: yup.string().email().required(),
		message: yup.string().required()
	});

	const {
		// watch,
		getValues,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onTouched",
		defaultValues: {
			fullName: "",
			companyName: "",
			email: "",
			message: ""
		}
	});

	return (
		<>
			<Head>
				<title>Contact | SmartVA</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{isBigView && <ThemeDrawer />}
			<ContactContentSection>
				<ContactTextContentWrap>
					<TextContentHeading isDark={isDark}>Contact Me</TextContentHeading>
					<TextContentDescription
					// sx={{ alignSelf: "initial" }}
					>
						I love taking on freelance projects, specially the challenging and ambitious ones.
						However, if you have another in mind, feel free to contact me and lets talk about it
						over a cup of coffee ☕.
						<Box
							sx={{
								mt: "1rem"
							}}>
							<form onSubmit={handleSubmit()}>
								<Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
									<ThemedFormControl
										control={control}
										name="fullName"
										label="Fullname"
										errors={errors}
										multiline={false}
									/>
									<ThemedFormControl
										control={control}
										name="companyName"
										label="Company Name"
										errors={errors}
										multiline={false}
									/>
								</Box>

								<ThemedFormControl
									control={control}
									name="email"
									label="Email"
									errors={errors}
									multiline={false}
								/>

								<ThemedFormControl
									control={control}
									name="message"
									label="Message"
									errors={errors}
									multiline={true}
									maxRows={5}
								/>

								<Box sx={{}}>
									<ThemedButton fullWidth variant="contained" disabled={submitting}>
										{submitting ? (
											<CircularProgress disableShrink={true} size={25} color="inherit" />
										) : (
											"Send Message"
										)}
									</ThemedButton>
								</Box>
							</form>
						</Box>
					</TextContentDescription>
				</ContactTextContentWrap>
			</ContactContentSection>
			{isBigView && (
				<ImageContentSection>
					<Box sx={{ height: "100%", width: "100%" }}>
						<GoogleMaps />
					</Box>
				</ImageContentSection>
			)}
		</>
	);
};

export default Contact;
