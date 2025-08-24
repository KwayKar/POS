import { useRuntimeConfig } from "nuxt/app";
import { apiFetch } from "../utils/apiFetch";

export async function fetchStoreList(estId, storeId) {
  const config = useRuntimeConfig();
  return await apiFetch(`${config.public.apiBaseUrl}/stores?establishmentId=${estId}`);
}

export async function fetchStoreById(storeId) {
  const config = useRuntimeConfig();
  return await apiFetch(`${config.public.apiBaseUrl}/stores/${storeId}`);
}

export async function updateStoreInfo(id, payload) {
  const config = useRuntimeConfig();
  return await apiFetch(`${config.public.apiBaseUrl}/stores/${id}/info`, {
    method: 'PATCH',
    body: payload,
  });
}

export async function updateStoreTax(id, taxInfo) {
  const config = useRuntimeConfig();
  return await apiFetch(`${config.public.apiBaseUrl}/stores/${id}/tax`, {
    method: 'PATCH',
    body: { taxInfo },
  });
}

export async function updateStoreOpeningHours(id, openingHours) {
  const config = useRuntimeConfig();
  return await apiFetch(`${config.public.apiBaseUrl}/stores/${id}/opening-hours`, {
    method: 'PATCH',
    body: { openingHours },
  });
}

export async function updateStoreReceipt(id, receiptSettings) {
  const config = useRuntimeConfig();
  return await apiFetch(`${config.public.apiBaseUrl}/stores/${id}/receipt`, {
    method: 'PATCH',
    body: { receiptSettings },
  });
}
