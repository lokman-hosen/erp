import { apiEndpoint } from "./apiEndpoint";
import { apiRequest, authApi } from "./interceptor/api.interceptor";

export const eventDateList = async (config: any) => {
	return apiRequest(apiEndpoint.homePage.eventDateList, config);
};

export const fetechClubData = async ({
	config,
	page,
	limit = 20,
}: {
	config: any;
	page: number;
	limit: number;
}) => {
	return apiRequest(
		apiEndpoint.homePage.clubList + `?limit=${limit}&page=${page}`,
		config
	);
};

export const fetechSingleClub = async (config: any, id: string) => {
	return apiRequest(apiEndpoint.homePage.singleClub + `/${id}`, config);
};

export const fetchSingleEvent = async (config: any, id: string) => {
	return apiRequest(apiEndpoint.singleEvent + `/${id}`, config);
};
export const searchResultApi = async (config: any, searchKey: string) => {
	return apiRequest(apiEndpoint.search + `?searchKey=${searchKey}`, config);
};

export const fetchOfferInfo = async (config: any, id: string) => {
	return apiRequest(apiEndpoint.singleOffer + `/${id}`, config);
};

export const clubSearchApi = async (
	config: any,
	filterkey: string,
	page: number,
	limit: number
) => {
	return apiRequest(
		apiEndpoint.homePage.clubsFilter +
			`?filterkey=${filterkey}&limit=${limit}&page=${page}`,
		config
	);
};

export const checkoutToPayment = async (config: any) => {
	return apiRequest(apiEndpoint.bookedOffer, config);
};

export const verifyBookedOfferApi = async (config: any, token: string) => {
	return apiRequest(apiEndpoint.verifyBookedOffer + `/${token}`, config);
};

export const fetchProfessionCatWithEntertainers = async (config: any) => {
	return apiRequest(apiEndpoint.getProfessionCatWithEntertainers, config);
};

export const fetchCustomerTickets = async ({
	config,
	page,
	limit = 20,
}: {
	config: any;
	page: number;
	limit: number;
}) => {
	return authApi(
		apiEndpoint.puchaseTicket + `?&limit=${limit}&page=${page}`,
		config
	);
};

export const fetchreservationsInfo = async (config: any, id: string) => {
	return apiRequest(apiEndpoint.bookoffers + `/${id}`, config);
};
