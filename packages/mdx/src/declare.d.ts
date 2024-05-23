declare module "vfile" {
  interface DataMap {
    matter: {
      // `file.data.matter.string` is typed as `string | undefined`.
      title?: string | undefined;
    };
  }
}

export {}; // You may not need this, but it makes sure the file is a module.
