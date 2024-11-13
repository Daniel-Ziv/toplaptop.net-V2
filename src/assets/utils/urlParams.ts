export const encodeParameters = (answers: any) => {
    const minimalAnswers = {
      t: answers.tasks,
      w: answers.weightImportance,
      b: {
        p: answers.budget.price,
        i: answers.budget.priceImportance
      },
      s: {
        s: answers.screenSize.selectedScreenSizes,
        i: answers.screenSize.sizeImportance
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
        ts: answers.features.touchscreen
      }
    };
  
    return btoa(JSON.stringify(minimalAnswers))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };
  
  export const decodeParameters = (encoded: string): any => {
    try {
      const base64 = encoded
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      
      const decoded = JSON.parse(atob(base64));
      
      return {
        tasks: decoded.t || [],
        weightImportance: decoded.w || 0,
        budget: {
          price: decoded.b?.p || 0,
          priceImportance: decoded.b?.i || 0
        },
        screenSize: {
          selectedScreenSizes: decoded.s?.s || [],
          sizeImportance: decoded.s?.i || 0
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
          touchscreen: decoded.f?.ts || false
        }
      };
    } catch (e) {
      console.error('Failed to decode parameters:', e);
      return null;
    }
  };