#!/bin/bash

if [[ "$OSTYPE" == "darwin"* ]]; then
  sedParams="-i.bkp"
else
  sedParams="-i"
fi

cd cdp-agentkit-core && make docs
if [ $? -ne 0 ]
then
  echo failed to run make docs for cdp-agentkit-core
  exit -1
fi

cd ..

cd cdp-langchain && make docs
if [ $? -ne 0 ]
then
  echo failed to run make docs for cdp-langchain
  exit -1
fi

cd ..

# mkdir -p docs
# if [ $? -ne 0 ]
# then
#   echo failed to run make docs dir 
#   exit -1
# fi

cp cdp-agentkit-core/docs/index.rst docs/cdp-agentkit-core.rst && \
cp cdp-agentkit-core/docs/modules.rst docs/cdp-agentkit-core-modules.rst && \
cp cdp-agentkit-core/docs/cdp_agentkit_core.rst docs/ && \
cp cdp-agentkit-core/docs/cdp_agentkit_core.actions.rst docs/
if [ $? -ne 0 ]
then
  echo failed to copy generated rst files from cdp-agentkit-core
  exit -1
fi

cp cdp-langchain/docs/index.rst docs/cdp-langchain.rst && \
cp cdp-langchain/docs/modules.rst docs/cdp-langchain-modules.rst && \
cp cdp-langchain/docs/cdp_langchain.agent_toolkits.rst docs/ && \
cp cdp-langchain/docs/cdp_langchain.rst docs/ && \
cp cdp-langchain/docs/cdp_langchain.tools.rst docs/ && \
cp cdp-langchain/docs/cdp_langchain.utils.rst docs/ && \
if [ $? -ne 0 ]
then
  echo failed to copy generated rst files from cdp-langchain
  exit -1
fi

# agentkit

sed $sedParams 's/README/README-cdp-agentkit-core/' docs/cdp-agentkit-core.rst
if [ $? -ne 0 ]
then
  echo failed to redirect cdp-agentkit-core readme
  exit -1
fi

sed $sedParams 's/modules/cdp-agentkit-modules/' docs/cdp-agentkit-core.rst
if [ $? -ne 0 ]
then
  echo failed to redirect cdp-agentkit-modules
  exit -1
fi

sed $sedParams 's/CDP Agentkit - //' docs/cdp-agentkit-core.rst
if [ $? -ne 0 ]
then
  echo failed to adjust copy for cdp-agentkit-core
  exit -1
fi


# langchain

sed $sedParams 's/README/README-cdp-langchain/' docs/cdp-langchain.rst
if [ $? -ne 0 ]
then
  echo failed to redirect cdp-langchain readme
  exit -1
fi

sed $sedParams 's/modules/cdp-langchain-modules/' docs/cdp-langchain.rst
if [ $? -ne 0 ]
then
  echo failed to redirect cdp-langchain-modules
  exit -1
fi

sed $sedParams 's/CDP Agentkit - //' docs/cdp-langchain.rst
if [ $? -ne 0 ]
then
  echo failed to adjust copy for cdp-langchain
  exit -1
fi


cat <<EOF > docs/index.rst
CDP Agentkit
============

.. include:: README.md
   :parser: myst_parser.sphinx_

.. toctree::
   :maxdepth: 2
   :caption: Contents:
   :hidden:

   cdp-agentkit-core
   cdp-langchain
EOF

cd docs

make html
if [ $? -ne 0 ]
then
  echo failed to generate html
  exit -1
fi

cd ..

# cleanup

if [[ "$OSTYPE" == "darwin"* ]]; then
  rm docs/cdp-agentkit-core.rst.bkp
  rm docs/cdp-langchain.rst.bkp
fi
