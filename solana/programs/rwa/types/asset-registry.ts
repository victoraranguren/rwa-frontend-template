export interface AssetRegistryData {
  address: string;
  programAddress: string;
  data: {
    id: number;
    authority: string;
    mint: string;
    assetName: string;
    assetSymbol: string;
    assetIsin: string;
    legalDocUri: string;
    creationDate: number;
    assetType: number;
    bump: number;
  };
}

// 1. Definimos la interfaz de SALIDA (lo que quieres obtener)
export interface AssetRegistryUI {
  executable: boolean;
  lamports: number;
  programAddress: string;
  space: number;
  address: string;
  data: {
    id: number;
    authority: string;
    mint: string;
    assetName: string;
    assetSymbol: string;
    assetIsin: string;
    legalDocUri: string;
    creationDate: number;
    assetType: number;
    bump: number;
  };
  exists: boolean;
}

// 2. La Función Transformadora
export function transformAssetAccount(rawAccount: any): AssetRegistryUI {
  // Desestructuramos para separar 'data' del resto
  const { data, ...rootFields } = rawAccount;
  // Desestructuramos 'data' para eliminar 'discriminator'
  // (La variable 'discriminator' se queda aquí y no pasa al return)
  const { discriminator, ...dataFields } = data;

  return {
    ...rootFields,
    // Convertimos los BigInts de la raíz
    lamports: Number(rootFields.lamports),
    space: Number(rootFields.space),

    data: {
      ...dataFields,
      // Convertimos los BigInts específicos de la data
      id: Number(dataFields.id),
      creationDate: Number(dataFields.creationDate),
      // El resto (strings, authority, etc.) pasan igual
    },
  };
}
