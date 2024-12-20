export const encodeParameters = (answers: any) => {
  const minimalAnswers = {
    t: answers.tasks,
    w: answers.weightImportance,
    b: {
      p: answers.budget.price,
      i: answers.budget.priceImportance,
    },
    s: {
      s: answers.screenSize.selectedScreenSizes,
      i: answers.screenSize.sizeImportance,
    },
    f: {
      c: answers.features.cpu,
      r: answers.features.ram_size,
      rt: answers.features.ram_type,
      ss: answers.features.storage_space,
      sr: answers.features.screenRes,
      sh: answers.features.screenhz,
      m: answers.features.manufacturer,
      g: answers.features.gpu,
      sc: answers.features.security,
      cn: answers.features.connections,
      fs: answers.features.flippingScreen,
      st: answers.features.screenType,
      ts: answers.features.touchscreen,
    },
  };

  const utf8Encoder = new TextEncoder();
  const encodedData = utf8Encoder.encode(JSON.stringify(minimalAnswers)); // Convert string to Uint8Array
  const base64String = btoa(String.fromCharCode(...Array.from(encodedData))) // Base64 encode
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // URL-safe replacements

  return base64String;
};

export const decodeParameters = (encoded: string): any => {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64); // Decode Base64
    const utf8Decoder = new TextDecoder();
    const jsonString = utf8Decoder.decode(
      Uint8Array.from(decodedData.split('').map((char) => char.charCodeAt(0)))
    );

    const decoded = JSON.parse(jsonString);

    return {
      tasks: decoded.t || [],
      weightImportance: decoded.w || 0,
      budget: {
        price: decoded.b?.p || 0,
        priceImportance: decoded.b?.i || 0,
      },
      screenSize: {
        selectedScreenSizes: decoded.s?.s || [],
        sizeImportance: decoded.s?.i || 0,
      },
      features: {
        cpu: decoded.f?.c || [],
        ram_size: decoded.f?.r || [],
        ram_type: decoded.f?.rt || [],
        storage_space: decoded.f?.ss || [],
        screenRes: decoded.f?.sr || [],
        screenhz: decoded.f?.sh || [],
        manufacturer: decoded.f?.m || [],
        gpu: decoded.f?.g || [],
        security: decoded.f?.sc || [],
        connections: decoded.f?.cn || [],
        flippingScreen: decoded.f?.fs || false,
        screenType: decoded.f?.st || [],
        touchscreen: decoded.f?.ts || false,
      },
    };
  } catch (e) {
    console.error('Failed to decode parameters:', e);
    return null;
  }
};
